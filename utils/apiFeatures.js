class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    const where = { ...this.queryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete where[el]);

    // Advanced filtering for Sequelize
    Object.keys(where).forEach(key => {
      where[key] = { [Sequelize.Op.eq]: where[key] };
    });

    this.query.where = where;

    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').map(field => {
        return field.startsWith('-') ? [field.slice(1), 'DESC'] : [field, 'ASC'];
      });
      this.query.order = sortBy;
    } else {
      // Default sorting by createdAt in descending order
      this.query.order = [['createdAt', 'DESC']];
    }

    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',');
      this.query.attributes = fields;
    }

    return this;
  }

  paginate() {
    const page = this.queryObj.page || 1;
    const limit = this.queryObj.limit || 100;
    const offset = (page - 1) * limit;

    this.query.offset = offset;
    this.query.limit = limit;

    return this;
  }
}

module.exports = APIFeatures;
