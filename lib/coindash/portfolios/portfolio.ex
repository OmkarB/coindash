defmodule Coindash.Portfolios.Portfolio do
  use Ecto.Schema
  import Ecto.Changeset


  schema "portfolios" do
    field :btc, :float
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(portfolio, attrs) do
    portfolio
    |> cast(attrs, [:btc])
    |> validate_required([:btc])
  end
end
