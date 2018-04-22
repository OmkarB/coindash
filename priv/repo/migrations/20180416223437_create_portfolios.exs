defmodule Coindash.Repo.Migrations.CreatePortfolios do
  use Ecto.Migration

  def change do
    create table(:portfolios) do
      add :btc, :float, null: false
      add :eth, :float, null: false
      add :etc, :float, null: false
      add :ltc, :float, null: false
      add :xrp, :float, null: false

      add :user_id, references(:users, on_delete: :delete_all), null: false


      timestamps()
    end

    create index(:portfolios, [:user_id])
  end
end
