defmodule CoindashWeb.CoinapiView do
  use CoindashWeb, :view
  alias CoindashWeb.CoinapiView

  def render("index.json", %{prices: prices}) do
    %{data: render_many(portfolios, CoinapiView, "coinapi.json")}
  end

  def render("show.json", %{price: price}) do
    %{data: render_one(portfolio, CoinapiView, "coinapi.json")}
  end

  def render("price.json", %{price: price}) do
    decoded_prices = Poison.decode!(price)
    %{
      price: decoded_prices
    }
  end
end
