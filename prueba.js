//req.body de patch 

{
  id: 1,
  fecha: '2020-05-25T00:00:00.000Z',
  tipo_pago: 'efectivo',
  estado: 'nuevo',
  createdAt: '2020-05-25T15:14:34.000Z',
  updatedAt: '2020-05-25T15:14:34.000Z',
  usuarioId: 4,
  productos: [
    {
      id: 3,
      nombreProducto: 'Hamburguesa con todo',
      imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA',
      precio: 30000,
      pedidos_producto: [Object]
    },
    {
      id: 6,
      nombreProducto: 'Coca cola',
      imagen: 'SOY LA IMAGEN DE LA cocacola',
      precio: 5000,
      pedidos_producto: [Object]
    },
    {
      id: 9,
      nombreProducto: 'Limonada',
      imagen: 'SOY LA IMAGEN DE LA LIMONADA',
      precio: 5000,
      pedidos_producto: [Object]
    }
  ]
}




PRODUCTOS [
  producto {
    dataValues: {
      id: 3,
      nombreProducto: 'Hamburguesa con todo',
      imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA',
      precio: 30000,
      createdAt: 2020-05-25T15:34:59.000Z,
      updatedAt: 2020-05-25T15:34:59.000Z,
      pedidos_producto: [pedidos_producto]
    },
    _previousDataValues: {
      id: 3,
      nombreProducto: 'Hamburguesa con todo',
      imagen: 'SOY LA IMAGEN DE LA HAMBURGUESA',
      precio: 30000,
      createdAt: 2020-05-25T15:34:59.000Z,
      updatedAt: 2020-05-25T15:34:59.000Z,
      pedidos_producto: [pedidos_producto]
    },
    _changed: {},
    _modelOptions: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: false,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: [Object],
      schema: null,
      schemaDelimiter: '',
      defaultScope: {},
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      include: [Array],
      includeNames: [Array],
      includeMap: [Object],
      includeValidated: true,
      attributes: [Array],
      raw: true
    },
    isNewRecord: false,
    pedidos_producto: pedidos_producto {
      dataValues: [Object],
      _previousDataValues: [Object],
      _changed: {},
      _modelOptions: [Object],
      _options: [Object],
      isNewRecord: false
    }
  },
  producto {
    dataValues: {
      id: 6,
      nombreProducto: 'Coca cola',
      imagen: 'SOY LA IMAGEN DE LA cocacola',
      precio: 5000,
      createdAt: 2020-05-25T15:34:59.000Z,
      updatedAt: 2020-05-25T15:34:59.000Z,
      pedidos_producto: [pedidos_producto]
    },
    _previousDataValues: {
      id: 6,
      nombreProducto: 'Coca cola',
      imagen: 'SOY LA IMAGEN DE LA cocacola',
      precio: 5000,
      createdAt: 2020-05-25T15:34:59.000Z,
      updatedAt: 2020-05-25T15:34:59.000Z,
      pedidos_producto: [pedidos_producto]
    },
    _changed: {},
    _modelOptions: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: false,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: [Object],
      schema: null,
      schemaDelimiter: '',
      defaultScope: {},
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      include: [Array],
      includeNames: [Array],
      includeMap: [Object],
      includeValidated: true,
      attributes: [Array],
      raw: true
    },
    isNewRecord: false,
    pedidos_producto: pedidos_producto {
      dataValues: [Object],
      _previousDataValues: [Object],
      _changed: {},
      _modelOptions: [Object],
      _options: [Object],
      isNewRecord: false
    }
  },
  producto {
    dataValues: {
      id: 9,
      nombreProducto: 'Limonada',
      imagen: 'SOY LA IMAGEN DE LA LIMONADA',
      precio: 5000,
      createdAt: 2020-05-25T15:34:59.000Z,
      updatedAt: 2020-05-25T15:34:59.000Z,
      pedidos_producto: [pedidos_producto]
    },
    _previousDataValues: {
      id: 9,
      nombreProducto: 'Limonada',
      imagen: 'SOY LA IMAGEN DE LA LIMONADA',
      precio: 5000,
      createdAt: 2020-05-25T15:34:59.000Z,
      updatedAt: 2020-05-25T15:34:59.000Z,
      pedidos_producto: [pedidos_producto]
    },
    _changed: {},
    _modelOptions: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: false,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: [Object],
      schema: null,
      schemaDelimiter: '',
      defaultScope: {},
      scopes: {},
      indexes: [],
      name: [Object],
      omitNull: false,
      sequelize: [Sequelize],
      hooks: {}
    },
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      include: [Array],
      includeNames: [Array],
      includeMap: [Object],
      includeValidated: true,
      attributes: [Array],
      raw: true
    },
    isNewRecord: false,
    pedidos_producto: pedidos_producto {
      dataValues: [Object],
      _previousDataValues: [Object],
      _changed: {},
      _modelOptions: [Object],
      _options: [Object],
      isNewRecord: false
    }
  }
]




PEDIDO pedido {
    dataValues: {
      id: 1,
      fecha: 2020-05-25T00:00:00.000Z,
      tipo_pago: 'efectivo',
      estado: 'nuevo',
      createdAt: 2020-05-25T15:35:02.000Z,
      updatedAt: 2020-05-25T15:35:02.000Z,
      usuarioId: 4
    },
    _previousDataValues: {
      id: 1,
      fecha: 2020-05-25T00:00:00.000Z,
      tipo_pago: 'efectivo',
      estado: 'nuevo',
      createdAt: 2020-05-25T15:35:02.000Z,
      updatedAt: 2020-05-25T15:35:02.000Z,
      usuarioId: 4
    },
    _changed: {},
    _modelOptions: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: false,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: { id: '1' },
      schema: null,
      schemaDelimiter: '',
      defaultScope: {},
      scopes: {},
      indexes: [],
      name: { plural: 'pedidos', singular: 'pedido' },
      omitNull: false,
      sequelize: Sequelize {
        options: [Object],
        config: [Object],
        dialect: [MysqlDialect],
        queryInterface: [QueryInterface],
        models: [Object],
        modelManager: [ModelManager],
        connectionManager: [ConnectionManager],
        importCache: {}
      },
      hooks: {}
    },
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      raw: true,
      attributes: [
        'id',
        'fecha',
        'tipo_pago',
        'estado',
        'createdAt',
        'updatedAt',
        'usuarioId'
      ]
    },
    isNewRecord: false
  }