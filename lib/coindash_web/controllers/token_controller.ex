defmodule CoindashWeb.TokenController do
  use CoindashWeb, :controller

  alias Coindash.Users
  alias Coindash.Users.User

  def create(conn, %{"name" => name, "password" => password}) do
  	with {:ok, %User{} = user} <- Coindash.Users.get_and_auth_user(name, password) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end