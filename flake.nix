# flake.nix
{
  description = "Create React App (CRA) with TypeScript development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05"; # You can choose the version of Nixpkgs here
  };

  outputs = { self, nixpkgs, ... }:
    let
      pkgs = import nixpkgs {
        system = "x86_64-linux"; # You can change this for other systems like "aarch64-linux"
      };
    in
    {
      devShell.x86_64-linux = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs # Node.js runtime required by CRA
          pkgs.yarn # Yarn package manager (optional, can use npm)
        ];

        # shellHook to install dependencies if not already installed
      };
    };
}
