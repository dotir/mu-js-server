/**
 * @typedef {'byte'|'word'|'wordLE'|'wordBE'|'dword'|'short'|'shortBE'|'shortLE'|'arrayPadding'|'char(??)'|object} PacketType
 */

/**
 * @typedef {Object.<string, PacketType>} PacketStructure
 */

/**
 * The extended packet header structure with subCode.
 * @type {{header: {type: string, size: string, headCode: string, subCode: string}}}
 */
const subCodeHeader = {
  header: {
    type: 'byte',
    size: 'byte',
    headCode: 'byte',
    subCode: 'byte',
  }
};

/**
 * Info: User login.
 * When: After submitting the login form.
 * Action: Sends the login credentials to GS.
 * C++ struct: PMSG_CONNECT_ACCOUNT_RECV
 */
const RequestLogin = {
  ...subCodeHeader,
  username: 'char(10)',
  password: 'char(20)',
  tickCount: 'dwordBE',
  version: 'char(5)',
  serial: 'char(16)'
};

/**
 * Info: Information about the login result
 * When: after the user login request was sent.
 * Action: Tells the client how to proceed.
 * C++ struct: PMSG_CONNECT_ACCOUNT_SEND
 */
const LoginResult = {
  ...subCodeHeader,
  result: 'byte'
};

/**
 * Info: Request the client to render the login screen scene.
 * When: Immediately when the Client is connected to the GS TCP.
 * Action: Tells the client to display the user login screen.
 * C++ struct: LPPRECEIVE_JOIN_SERVER in Main.
 */
const NewClientConnected = {
  ...subCodeHeader,
  result: 'byte',
  playerIndexH: 'byte',
  playerIndexL: 'byte',
  version: 'char(5)'
};

/**
 * Info: Sends the login result to the client.
 * When: Receive JS login result and just proxy the outcome to the client.
 * Action: Lets the client know what is the login result.
 * C++ struct: PMSG_CONNECT_ACCOUNT_SEND in GS.
 */
const LoginResultToClient = {
  ...subCodeHeader,
  result: 'byte',
};

/**
 * Info: Sends the list with characters to the client.
 * When: The user is successfully logged, the client requests the list.
 * Action: Lets the client know the full list of the user characters.
 * C++ struct: SDHP_CHARACTER_LIST_SEND in DS.
 */
const CharacterList = {
  ...subCodeHeader,
  maxClass: 'byte',
  moveCount: 'byte',
  characterCount: 'byte',
  isVaultExtended: 'byte',
  characterList: [{
    slot: 'byte',
    name: 'char(10)',
    level: 'word',
    ctlCode: 'byte',
    charSet: 'byte(17)',
    guildStatus: 'byte',
    padding: 'arrayPadding',
  }],
};

/**
 * Info: Sends info about what character types are unlocked for creation.
 * When: Immediately after sending the characters info.
 * Action: The client unlocks different type of characters for creation.
 * C++ struct: LPPHEADER_CHARACTERCARD in Client.
 */
const CharacterClassCreationUnlock = {
  ...subCodeHeader,
  flags: 'byte',
};

/**
 * Info: Client sends a request to create a new character.
 * When: Client creates a new character.
 * Action: Creates the character and returns the list with characters.
 * C++ struct: SendRequestCreateCharacter in Client inline.
 */
const RequestCreateCharacter = {
  ...subCodeHeader,
  name: 'char(10)',
  class: 'byte'
};

/**
 * Info: Sends the result of the character creation to the client.
 * When: Client requests to create a new character.
 * Action: Either displays an error message or tells the client to crete the character.
 * C++ struct: PMSG_CHARACTER_CREATE_SEND in GS.
 */
const CreateCharacterSend = {
  ...subCodeHeader,
  result: 'byte',
  name: 'char(10)',
  slot: 'byte',
  level: 'word',
  class: 'byte',
  equipment: 'byte(124)'
};

/**
 * Info: Sends the result of the character creation to the client.
 * When: Client requests to create a new character.
 * Action: Either displays an error message or tells the client to crete the character.
 * C++ struct: PMSG_CHARACTER_CREATE_SEND in GS.
 */
const CreateCharacterFailSend = {
  ...subCodeHeader,
  result: 'byte',
};

const structures = {
  RequestLogin,
  LoginResult,
  NewClientConnected,
  LoginResultToClient,
  CharacterList,
  CharacterClassCreationUnlock,
  RequestCreateCharacter,
  CreateCharacterSend,
  CreateCharacterFailSend
};

module.exports = structures;
