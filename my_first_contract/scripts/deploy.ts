import { address, toNano } from "@ton/core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton/blueprint";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0, 
      address: address("EQAfhnbTHRL2eKZTqrr9UAThjDdfUOoZftVtVeYGvtP1jgzg"),
      owner_address: address(
        "EQAfhnbTHRL2eKZTqrr9UAThjDdfUOoZftVtVeYGvtP1jgzg"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.05"));

  await provider.waitForDeploy(myContract.address);
}

