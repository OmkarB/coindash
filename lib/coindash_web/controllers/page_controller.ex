defmodule CoindashWeb.PageController do
  use CoindashWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
