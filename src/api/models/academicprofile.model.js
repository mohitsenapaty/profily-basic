const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const academicprofileSchema = new dynamoose.Schema({
  _id: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    hashKey: true,
    default: id_gen
  },
  schoolid: {
    type: String,
    required: true,
    index: {
      name: 'schoolid-academicprofile',
      global: true,
    },
  },
  session: {
    type: String,
  },
  description: {
    type: String,
  },
  startdate: {
    type: String,
  },
  enddate: {
    type: String,
  },
  structure: {
    type: Array,
    schema: [{
      type: Object,
      schema: {
        standard: String,
        section: String,
      },
    }],
  },
  subjects: {
    type: Array,
    schema: [{
      type: Object,
      schema: {
        subjectname: String,
        subjectcode: String,
      },
    }]
  },
  status: {
    type: String,
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

const academicprofileModel = dynamoose.model("Profily-Academicprofile", academicprofileSchema);

academicprofileModel.methods.set("createAcademicprofile", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
  ]);
  const academicprofile = this.get({_id: createParams._id});
  return academicprofile;
});

academicprofileModel.methods.set("updateAcademicprofile", async function (key, params) {
    await dynamoose.transaction(compact([
      this.transaction.update(key, params),
    ]));
    const academicprofile = await this.get(key);
    return academicprofile;
});

module.exports = academicprofileModel;