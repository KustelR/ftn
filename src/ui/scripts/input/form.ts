type FormEntryDataType = "string" | "select";

interface EntryData {
  type: FormEntryDataType;
}

interface EntryString extends Entry {
  type: "string";
  data: string;
}

interface Entry {
  name: string;
  type: "string" | "select";
}

export function createJsonForm(entries: Array<Entry>) {
  const form = document.createElement("form");
  entries.forEach((entry) => {
    if (entry.type === "string") {
    }
  });
}
