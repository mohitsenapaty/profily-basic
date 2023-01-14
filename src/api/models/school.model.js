const dynamoose = require("dynamoose");
const { omit, isEmpty, pick, compact } = require('lodash');
const bcrypt = require('bcryptjs');

const id_gen = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const schoolSchema = new dynamoose.Schema({
  _id: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true,
    hashKey: true,
    default: id_gen
  },
  schoolname: {
    type: String,
  },
  schooladdress: {
    type: String,
  },
  schoolpin: {
    type: String,
  },
  schoolemail: {
    type: String,
    index: {
      name: 'schoolemail',
      global: true,
    },
  },
  schoolphone: {
    type: String,
    index: {
      name: 'schoolphone',
      global: true,
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

const schoolModel = dynamoose.model("Profily-School", schoolSchema);

schoolModel.methods.set("createSchool", async function (params) {
  const createParams = {
    ...(params),
    _id: id_gen()
  }
  await dynamoose.transaction([
    this.transaction.create(createParams),
    this.transaction.create({_id: `phone#${params.schoolphone}`}),
    this.transaction.create({_id: `email#${params.schoolemail}`}),
  ]);
  const school = this.get({_id: createParams._id});
  return school;
});

schoolModel.methods.set("updateSchool", async function (key, params) {
  const updateEmail = (!isEmpty(params.email)) ? true : false;
  const updatePhone = (!isEmpty(params.phone)) ? true : false;
  
  const prevSchool = await this.get(key);
  await dynamoose.transaction(compact([
    this.transaction.update(key, params),
    updatePhone && this.transaction.delete({_id: `phone#${prevSchool.schoolphone}`}),
    updatePhone && this.transaction.create({_id: `phone#${params.schoolphone}`}),
    updateEmail && this.transaction.delete({_id: `email#${prevSchool.schoolemail}`}),
    updateEmail && this.transaction.create({_id:`email#${params.schoolemail}`}),
  ]));
  const school = await this.get(key);
  return school;
});

module.exports = schoolModel;