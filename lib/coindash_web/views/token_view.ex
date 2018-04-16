defmodule Coindash.TokenView do
  use CoindashWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      email: user.email,
      token: token,
    }
  end
end