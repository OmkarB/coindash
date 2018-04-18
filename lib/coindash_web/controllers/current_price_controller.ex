defmodule CoindashWeb.CurrentPriceController do
  use CoindashWeb, :controller

    def get_prices(conn, %{}) do

	    query = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,LTC,BCH,XRP&tsyms=USD"
		uri = URI.encode(query)

	  	res = HTTPoison.get!(uri)
	  	data = Poison.decode!(res.body)

	  	current_price = data

  	render(conn, "show.json", current_price: current_price)
  end

end