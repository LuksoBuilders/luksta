# Luksta the LUKSO's kick starter

[Live Demo](https://luksta.io)

**Luksta** serves as the foundational hub for all decentralized applications on **LUKSO**, whether they involve gaming, social platforms, or decentralized autonomous organizations (DAOs). It marks the inception of your project's journey.

To initiate a project on Lukso, your first step involves creating a Universal Profile. Why? Simply put, Universal Profiles are instrumental. They serve as the initial point of reference for anyone curious about your project, providing it with a distinctive identity. Not only do they house essential metadata, but they also manage your brand assets. Moreover, a Universal Profile enables individuals to verify the authenticity of assets issued by your brand. Beyond these functionalities, it seamlessly integrates your brand with other applications, such as social feeds, designed to align effortlessly with universal profiles.

Following that, it's essential to forge a governance token for your brand. A decentralized project thrives on the absence of singular leadership. Governance tokens play a pivotal role in distributing decision-making across the project, fostering a more decentralized and inclusive approach to project governance.

Subsequently, you'll proceed to create vaults designed to secure those tokens, catering to your founders, investors, and the treasury of your brand. Following this, the distribution of tokens needs to be meticulously executed to ensure fair and proper allocation.

However, there's more to the process. Now, you must establish a sense of trust with your external investors. It's imperative to assure them that your commitment extends beyond a mere initial investment. This is where vesting comes into play. Implementing a vesting schedule reinforces the commitment to the project, ensuring that investors can be confident that your dedication remains steadfast, and mitigating concerns about token dumping and abandonment.

Now, we confront the most challenging phase. Constructing any project is a formidable task, particularly when it comes to decentralized initiatives, and financial resources become imperative. You need an effective method to raise capital. Amid the evolving landscape of our industry, we've explored various fundraising models, and it appears that the fairest among them is a mechanism known as the **Batch Auction**. This approach combines the advantages of both Dutch and English auctions while mitigating their respective drawbacks.

In summary Luksta help you with:

1.  Establishing your project as a Universal Profile.
2.  Crafting a governance token tailored to your project.
3.  Connecting the token to your Universal Profile.
4.  Creating essential vaults for founders, investors, and treasury management.
5.  Distributing token to the proper vaults.
6.  Guiding you through the setup of a Vesting Schedule, providing security for your public investors.
7.  Orchestrating a batch auction to raise funds by auctioning your governance tokens.
8.  Facilitating the whitelisting process, ensuring control over who can participate in your auction.

## How it works

## How I built it

Not only did I need to overcome the challenge of building a user-friendly interface with a seamless user experience, but I also had to address the absence of certain infrastructures on LUKSO. Consequently, I undertook the task of creating these infrastructures to fulfill the specific needs of Luksta. The result is a dual accomplishment: a user-friendly interface that enhances the overall experience and the establishment of additional infrastructures that are now available for adoption by other projects.

### Wrapped LYX

The first addition is a wrapper designed for the native coin of the chain, **LYX**. This wrapper facilitates the conversion of native **LYX** into a wrapped **LSP7 version**. While its utility may seem straightforward, it plays a crucial role in the development of systems that operate with the LSP7 token contract. This wrapper eliminates the need to create additional functionality solely to support the native coin, providing a more efficient and streamlined approach.
Here is the repository:
[Wrapped LYX](https://github.com/LuksoBuilders/Wrapped-LYX)

### Gnosis Auction -> Lukso Auction

The Gnosis auction software is designed for batch auctioning ERC20 tokens. Developed by the Gnosis team, this sophisticated smart contract ensures the secure handling of batch auctions. However, as it initially supported only ERC20 tokens, I undertook the task of forking the code and adapting it to be compatible with LSP7. For the modified version tailored to LSP7 compatibility, you can find the repository here:
[LUKSO Auction](https://github.com/LuksoBuilders/auction-contracts)

### Graph Node

To incorporate the Gnosis auction on the frontend, utilizing its subgraph is essential. However, before accessing the subgraph, a graph node that supports Lukso is necessary. Currently, The Graph lacks nodes for the LUKSO ecosystem. Consequently, I took the initiative to fork the graph node, ensuring its compatibility with LUKSO to seamlessly integrate it into the project.

[LUKSO Graph Node](https://github.com/LuksoBuilders/graph-node)

### Auction Subgraph

Subsequently, I had to adapt the existing Gnosis auction subgraph to align with the version we deployed on LUKSO. Following this, deploying the modified subgraph into our graph node became a crucial step in the integration process.

[Auction Subgraph Repository](https://github.com/LuksoBuilders/graph-node)
[Auction Subgraph](https://www.luksta.io/subgraphs/name/gnosisauctionservice)

### LSP7 Vesting Wallet

Openzepplin have a VestingWallet which take care of vesting of ERC20s, I use that contract as a core and created a Vesting Wallet for the LSP7 tokens.

[LSP7 Vesting Wallet](https://github.com/LuksoBuilders/luksta/blob/main/smart-contracts/contracts/LSP7VestingBase/VestingWalletUpgradeable.sol)

### Luksta Factory

This serves as the entry contract for Luksta. To enable users to create their projects in a single transaction, I deviated from using the lsp-factory tools provided by the LUKSO team. Instead, I studied and modified these tools to incorporate the uploading of project metadata. The LukstaFactory, subsequently, manages the entire process. Leveraging OpenZeppelin's minimal proxy, it deploys a universal profile for a project, configures metadata, establishes a universal receiver, generates vaults and vesting wallets, creates a governance token, distributes it, and initiates an auction — all within a single transaction.
[LukstaFactory](https://github.com/LuksoBuilders/luksta/blob/main/smart-contracts/contracts/LukstaFactory.sol)

### Frontend

The frontend boasts an aesthetically pleasing UI crafted with Next.js. To navigate the intricacies of metadata upload, I implemented clever strategies involving the tools-lsp-factory. Despite our projects being universal profiles, they feature multiple images stored in the profile metadata. Additionally, I initiated the development of a drafting and caching system. While I haven't had the opportunity to complete it in full, the foundational framework is established, utilizing LocalForage.

[Luksta Client Repository](https://github.com/LuksoBuilders/luksta/tree/main/ui)
[Luksta Client Address](https://www.luksta.io/)

## What's next

I estimate the launch of luksta will be in the Jan 2024. Since the criticial part of the system is the auction contract which is already created by gnosis and has been audited we don't need to be too worry about it securly wise. This help us to launch it fast.

- [ ] Converting Luksta Factory to LSP17 Extension
- [ ] Completing the Luksta Factory to fully support our initial use case
- [ ] Converting tests of lukso auctions
- [ ] Add the remaining neccessary features of the frontend
- [ ] Building social presence of Luksta
- [ ] Collecting fee's of auctions
- [ ] Launching to the mainnet
- [ ] Creating the first project which be Luksta itself
