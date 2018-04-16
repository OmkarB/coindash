defmodule CoindashWeb.PortfolioView do
  use CoindashWeb, :view
  alias CoindashWeb.PortfolioView

  def render("index.json", %{portfolios: portfolios}) do
    %{data: render_many(portfolios, PortfolioView, "portfolio.json")}
  end

  def render("show.json", %{portfolio: portfolio}) do
    %{data: render_one(portfolio, PortfolioView, "portfolio.json")}
  end

  def render("portfolio.json", %{portfolio: portfolio}) do
    %{id: portfolio.id,
      btc: portfolio.btc,
      eth: portfolio.eth,
      etc: portfolio.etc,
      ltc: portfolio.ltc,
      xrp: portfolio.xrp
    }
  end
end
