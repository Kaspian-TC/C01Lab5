test("1+2=3, empty array is empty", () => {
  expect(1 + 2).toBe(3);
  expect([].length).toBe(0);
});
const SERVER_URL = "http://localhost:4000";
const fetch = require('node-fetch'); //this line needed to be added
test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});
const postNote = async (title, content) => { //helper function
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();
  return postNoteBody;
};

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  const getAllNoteBody = await getAllNoteRes.json();

  expect(getAllNoteRes.status).toBe(200);
  expect(getAllNoteBody.response).toStrictEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  const getAllNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  const getAllNoteBody = await getAllNoteRes.json();

  expect(getAllNoteRes.status).toBe(200);
  expect(getAllNoteBody.response).toStrictEqual([]);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});