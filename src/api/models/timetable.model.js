const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const timetableSchema = new dynamoose.Schema({
  _id: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    hashKey: true,
    default: id_gen
  },
  academicprofileid: {
    type: String,
    required: true,
    index: {
      name: 'academicprofileid-timetable',
      global: true,
    },
  },
  schoolid: {
    type: String,
    required: true,
    index: {
      name: 'schoolid-timetable',
      global: true,
    },
  },
  validfrom: {
    type: Date,
  },
  validto: {
    type: Date,
  },
  schedule: {
    type: Object,
    schema: {
      class: String,
      section: String,
      breakup: {
        type: Object,
        schema: {
          day: String,
          daybreakup: {
            type: Object,
            schema: {
              from: String,
              to: String,
              subject: String,
              teacher: String,
            },
          },
        }
      },
    },
  },
  addedby: {
    type: String,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  archivedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const timetableModel = dynamoose.model("Profily-Timetable", timetableSchema);

timetableModel.methods.set("createTimetable", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
  ]);
  const school = this.get({_id: createParams._id});
  return school;
});

timetableModel.methods.set("updateTimetable", async function (key, params) {
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
  ]));
  const school = await this.get(key);
  return school;
});

module.exports = timetableModel;