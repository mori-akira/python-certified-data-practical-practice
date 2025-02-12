// 進捗管理DB
const db = new Dexie("CompetionCheckDB_PythonCertified_DataPractical");
// 進捗管理データストア
db.version(1).stores({
  CompletionCheck: "++id, progress, datetime",
});

// 進捗管理DAOオブジェクト
const CompletionCheckDao = {
  add: async (progress) => {
    await db.CompletionCheck.put({
      progress: progress,
      datetime: new Date(),
    });
  },
  delete: async (id) => {
    await db.CompletionCheck.where({
      id: id,
    }).delete();
  },
  deleteOld: async (num) => {
    const list = await CompletionCheckDao.readAll();
    (list.slice(0, -num) ?? []).forEach(async (e) => {
      await CompletionCheckDao.delete(e.id);
    });
  },
  readAll: async () => {
    return await db.CompletionCheck.toArray();
  },
  readLatest: async () => {
    const list = await CompletionCheckDao.readAll();
    return list.slice(-1)[0] ?? null;
  },
};

// 進捗管理データ
let completionCheckData;

const addCheckBox = async () => {
  $(".completion-check-target").each(async (_, e) => {
    const text = $(e).text();
    console.log(text);
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(text)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const id = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, 64);
    const box = $(`<input type="checkbox" id="${id}">`);
    box.prop("checked", completionCheckData[id]);
    box.on("change", async () => {
      completionCheckData[id] = box.prop("checked");
      await CompletionCheckDao.add(completionCheckData);
    });
    const label = $(`<label for="${id}">学習済み</label>`);
    $(e).append(box);
    $(e).append(label);
  });
};

$(async () => {
  completionCheckData = (await CompletionCheckDao.readLatest())?.progress ?? {};
  await addCheckBox();
});
