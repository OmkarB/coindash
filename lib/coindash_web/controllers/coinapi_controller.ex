defmodule CoindashWeb.CoinapiController do
  use CoindashWeb, :controller

  def url, do: "https://min-api.cryptocompare.com/data/histohour?"

  def get_histprices_by_asset(conn, %{"asset" => asset}) do

  	query = "fsym=#{asset}&tsym=USD&limit=10"
  	uri = URI.encode(url() <> query)
    res = HTTPoison.get!(uri)
  	prices = Poison.decode!(res.body)["Data"]
  	render(conn, "index.json", prices: prices)
  end

end