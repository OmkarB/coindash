defmodule CoindashWeb.CoinapiView do
  use CoindashWeb, :view

  def render("index.json", %{prices: prices}) do
    %{data: render_many(prices, CoindashWeb.CoinapiView, "price.json", as: :price)}
  end

  def render("show.json", %{price: price}) do
    %{data: render_one(price, CoindashWeb.CoinapiView, "price.json", as: :price)}
  end

  def render("price.json", %{price: price}) do
    IO.inspect price
    %{
      close: price["close"],
      high: price["high"],
      low: price["low"],
      open: price["open"],
      time: price["time"],
      volumeto: price["volumeto"],
      volumefrom: price["volumefrom"]
    }
  end
end
