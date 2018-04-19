defmodule CoindashWeb.Router do
  use CoindashWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", CoindashWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/portfolios", PortfolioController, except: [:new, :edit]


    post "/token", TokenController, :create

    get "/prices/:asset", CoinapiController, :get_histprices_by_asset
    get "/currentprices", CurrentPriceController, :get_prices

  end

  scope "/", CoindashWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

end
