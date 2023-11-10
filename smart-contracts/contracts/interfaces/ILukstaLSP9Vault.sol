import {ILSP9Vault} from "@lukso/lsp-smart-contracts/contracts/LSP9Vault/ILSP9Vault.sol";
import {IERC725Y} from "@erc725/smart-contracts/contracts/interfaces/IERC725Y.sol";
import {ILSP14Ownable2Step} from "@lukso/lsp-smart-contracts/contracts/LSP14Ownable2Step/ILSP14Ownable2Step.sol";

interface ILukstaLSP9Vault is ILSP9Vault, IERC725Y, ILSP14Ownable2Step {
    function initialize(address newOwner) external payable;
}
