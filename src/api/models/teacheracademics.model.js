const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const teacheracademicsSchema = new dynamoose.Schema({
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
      name: 'academicprofileid-teacheracademics',
      global: true,
    },
  },
  schoolid: {
    type: String,
    required: true,
    index: {
      name: 'schoolid-teacheracademics',
      global: true,
    },
  },
  teacherprofileid: {
    type: String,
    required: true,
    index: {
      name: 'teacherprofileid-teacheracademics',
      global: true,
    },
  },
  subjects: {
    type: Array,
    schema: [{
      type: Object,
      schema: {
        standard: String,
        section: String,
        subjectname: String,
        subjectcode: String,
      },
    }],
  },
  classteacher: {
    type: Object,
    schema: {
      isclassteacher: {
        type: Boolean,
        default: false,
      },
      standard: String,
      section: String,
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

const teacheracademicsModel = dynamoose.model("Profily-Teacheracademics", teacheracademicsSchema);

teacheracademicsModel.methods.set("createTeacheracademics", async function (params) {
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

teacheracademicsModel.methods.set("updateTeacheracademics", async function (key, params) {
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
  ]));
  const school = await this.get(key);
  return school;
});

module.exports = teacheracademicsModel;