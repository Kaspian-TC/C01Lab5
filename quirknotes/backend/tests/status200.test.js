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
  deleteAllNotes();
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
  await postNote("NoteTitleTest1", "NoteTitleContent1");
  await postNote("NoteTitleTest2", "NoteTitleContent2");
  const getAllNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  const getAllNoteBody = await getAllNoteRes.json();

  expect(getAllNoteRes.status).toBe(200);
  expect(getAllNoteBody.response).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        title: "NoteTitleTest1",
        content: "NoteTitleContent1"
      }),
      expect.objectContaining({
        title: "NoteTitleTest2",
        content: "NoteTitleContent2"
      })
    ])
  );
  deleteAllNotes();
});
const getAllNotes = async () => {
  const getAllNoteRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  const getAllNoteBody = await getAllNoteRes.json();
  return getAllNoteBody;
};
const findNoteId = async (title, content) => {
  const getAllNoteBody = await getAllNotes();
  const note = getAllNoteBody.response.find(note => 
    note.title === title && note.content === content);
  return note ? note._id : null;
};

test("/deleteNote - Delete a note", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  const createdNoteId = await findNoteId("NoteTitleTest", "NoteTitleContent");
  
  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/` + createdNoteId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const deleteNoteBody = await deleteNoteRes.json();

  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${createdNoteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  const createdNoteId = await findNoteId("NoteTitleTest", "NoteTitleContent");
  const title = "NewNoteTitleTest";
  const content = "NewNoteTitleContent";
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/`+ createdNoteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${createdNoteId} patched.`);
  deleteAllNotes();
});

test("/patchNote - Patch with just title", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  const createdNoteId = await findNoteId("NoteTitleTest", "NoteTitleContent");
  const title = "NewNoteTitleTest";
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/`+ createdNoteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${createdNoteId} patched.`);
  deleteAllNotes();
});

test("/patchNote - Patch with just content", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  const createdNoteId = await findNoteId("NoteTitleTest", "NoteTitleContent");
  const content = "NewNoteTitleContent";
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/`+ createdNoteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    }),
  });

  const patchNoteBody = await patchNoteRes.json();

  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${createdNoteId} patched.`);
  deleteAllNotes();
});

test("/deleteAllNotes - Delete one note", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
  });
  const deleteAllBody = await deleteAllRes.json();

  expect(deleteAllRes.status).toBe(200);
  expect(deleteAllBody.response).toBe("1 note(s) deleted.");
});
const deleteAllNotes = async () => { //helper function
  const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const deleteAllBody = await deleteAllRes.json();
  return deleteAllBody;
};


test("/deleteAllNotes - Delete three notes", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  await postNote("NoteTitleTest1", "NoteTitleContent1");
  await postNote("NoteTitleTest2", "NoteTitleContent2");
  const deleteAllRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
  });
  const deleteAllBody = await deleteAllRes.json();

  expect(deleteAllRes.status).toBe(200);
  expect(deleteAllBody.response).toBe("3 note(s) deleted.");
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  await postNote("NoteTitleTest", "NoteTitleContent");
  const createdNoteId = await findNoteId("NoteTitleTest", "NoteTitleContent");
  const color = "#FF0000";
  const colorNoteRes = await fetch(`${SERVER_URL}/updateNoteColor/` + createdNoteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      color: color,
    }),
  });
  
  const colorNoteBody = await colorNoteRes.json();

  expect(colorNoteRes.status).toBe(200);
  expect(colorNoteBody.message).toBe("Note color updated successfully.");
});