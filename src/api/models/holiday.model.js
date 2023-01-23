const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const holidaySchema = new dynamoose.Schema({
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
      name: 'academicprofileid-holiday',
      global: true,
    },
  },
  schoolid: {
    type: String,
    required: true,
    index: {
      name: 'schoolid-holiday',
      global: true,
    },
  },
  holidayname: {
    type: String,
  },
  description: {
    type: String,
  },
  holidaytype: {
    type: String,
  },
  datestart: {
    type: Date,
  },
  dateend: {
    type: Date,
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

const holidayModel = dynamoose.model("Profily-Holiday", holidaySchema);

holidayModel.methods.set("createHoliday", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
  ]);
  const holiday = this.get({_id: createParams._id});
  return holiday;
});

holidayModel.methods.set("updateHoliday", async function (key, params) {
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
  ]));
  const holiday = await this.get(key);
  return holiday;
});

module.exports = holidayModel;