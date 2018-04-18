defmodule CoindashWeb.CurrentPriceView do
  use CoindashWeb, :view

   def render("index.json", %{current_prices: current_prices}) do
    %{data: render_many(current_prices, CoindashWeb.CurrentPriceView, "current_prices.json", as: :current_price)}
   end

   def render("show.json", %{current_price: current_price}) do
    %{data: render_one(current_price, CoindashWeb.CurrentPriceView, "current_price.json", as: :current_price)}
   end

   def render("current_price.json", %{current_price: current_price}) do
   	%{
   		XRP: current_price["XRP"]["USD"],
   		ETH: current_price["ETH"]["USD"],
   		ETC: current_price["ETC"]["USD"],
   		BCH: current_price["BCH"]["USD"],
   		LTC: current_price["LTC"]["USD"],
   		BTC: current_price["BTC"]["USD"]
   	}
   end
end