defmodule Coindash.Portfolios.Portfolio do
  use Ecto.Schema
  import Ecto.Changeset


  schema "portfolios" do
    field :btc, :float
    field :bch, :float
    field :ltc, :float
    field :xrp, :float
    field :eth, :float
    field :etc, :float
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(portfolio, attrs) do
    portfolio
    |> cast(attrs, [:btc, :eth, :etc, :bch, :ltc, :xrp, :user_id])
    |> validate_required([:btc, :eth, :etc, :bch, :ltc, :xrp, :user_id])
  end
end
