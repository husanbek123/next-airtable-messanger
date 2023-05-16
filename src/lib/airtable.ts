import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_KEY as string
);

const Chats = base("chats-and-messages");
const Users = base("users");
export default Chats;
export { Users };
