const NoteService = require("../services/NoteService");

module.exports = {
  ping: (req, res) => {
    res.json({ pong: true });
  },
  all: async (req, res) => {
    let json = { error: "", result: [] };
    let notes = await NoteService.getAll();
    for (let i in notes) {
      json.result.push({
        id: notes[i].id,
        title: notes[i].title,
      });
    }
    res.json(json);
  },
  one: async (req, res) => {
    let json = { error: "", result: {} };
    const { id } = req.params;
    const note = await NoteService.findById(id);
    if (note) {
      json.result = note;
    }
    res.json(json);
  },
  new: async (req, res) => {
    let json = { error: "", result: {} };
    const { title, body } = req.body;
    if (title && body) {
      const id = await NoteService.add(title, body);
      json.result = {
        id,
        title,
        body,
      };
    } else {
      json.error = "Campos não enviados.";
    }
    res.json(json);
  },
  edit: async (req, res) => {
    let json = { error: "", result: {} };
    const { title, body } = req.body;
    const { id } = req.params;
    if (id && title && body) {
      await NoteService.update(id, title, body);
      json.result = {
        id,
        title,
        body,
      };
    } else {
      json.error = "Campos não enviados.";
    }
    res.json(json);
  },
  delete: async (req, res) => {
    let json = { error: "", result: {} };
    const { id } = req.params;
    if (id) {
      await NoteService.delete(id);
    } else {
      json.error = "Campos não enviados.";
    }
    res.json(json);
  },
};
