defmodule CoindashWeb.CoinapiController do
  use CoindashWeb, :controller

  def url, do: "https://min-api.cryptocompare.com/data/histohour?"


  def get_histprices_by_asset(conn, %{"asset" => asset}) do

  	query = "fsym=#{asset}&tsym=USD&limit=10"
  	uri = URI.encode(url() <> query)

  	res = HTTPoison.get!(uri)
  	data = Poison.decode!(res.body)

  	price = data['Data']
  	|> Poison.encode!()

  	render(conn, "show.json", price: price)
  end

  def get_prices(conn) do

    query = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,LTC,BCH,XRP&tsyms=USD"
	uri = URI.encode(url() <> query)

  	res = HTTPoison.get!(uri)
  	data = Poison.decode!(res.body)

  	price = data['Data']
  	|> Poison.encode!()

  	render(conn, "show.json", price: price)
  end

end