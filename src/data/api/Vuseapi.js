export default {
  'vuse-card-mini-widget': {
    'props': [
      {
        'name': 'headline',
        'type': 'String',
        'default': null,
        'source': null
      },
      {
        'name': 'subheader',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'gradient',
        'type': 'String',
        'default': null,
        'source': null
      },
      {
        'name': 'height',
        'type': 'String',
        'default': '100px',
        'scource': null
      },
      {
        'name': 'avatar',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'icon',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'iconColor',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'background',
        'type': 'String',
        'default': 'white',
        'scource': null
      },
      {
        'name': 'size',
        'type': 'String',
        'default': `30px`,
        'scource': null
      },
      {
        'name': 'className',
        'type': 'Array',
        'default': [],
        'scource': null
      },
      {
        'name': 'dark',
        'type': 'Boolean',
        'default': false,
        'scource': null
      },
      {
        'name': 'rightIcon',
        'type': 'Boolean',
        'default': false,
        'scource': null
      },
      {
        'name': 'tile',
        'type': 'Boolean',
        'default': false,
        'scource': null
      }
    ],
    'events': [
      {
        'name': 'click',
        'value': ''
      }
    ]
  },
  'vuse-action-card-widget': {
    'props': [
      {
        'name': 'cardMedia',
        'type': 'String',
        'default': null,
        'source': null
      },
      {
        'name': 'mediaHeight',
        'type': 'String',
        'default': '200px',
        'scource': null
      },
      {
        'name': 'mediaHeadline',
        'type': 'String',
        'default': null,
        'source': null
      },
      {
        'name': 'actions',
        'type': 'Array',
        'default': '100px',
        'scource': null
      },
      {
        'name': 'cardTitle',
        'type': 'Object',
        'default': null,
        'scource': null
      }
    ]
  },
  'vuse-user-profile-widget': {
    'props': [
      {
        'name': 'avatar',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'name',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'size',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'dark',
        'type': 'Boolean',
        'default': false,
        'scource': null
      },
      {
        'name': 'iconColor',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'gradient',
        'type': 'String',
        'default': null,
        'source': null
      },
      {
        'name': 'height',
        'type': 'String',
        'default': '400px',
        'scource': null
      },
      {
        'name': 'background',
        'type': 'String',
        'default': 'white',
        'scource': null
      },
      {
        'name': 'className',
        'type': 'Array',
        'default': [],
        'scource': null
      },
      {
        'name': 'iconSize',
        'type': 'String',
        'default': '75px',
        'scource': null
      },
      {
        'name': 'avatarColor',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'icon',
        'type': 'String',
        'default': null,
        'scource': null
      }
    ],
    'slots': [
      'details',
      'actions'
    ]
  },
  'mini-chart': {
    'props': [
      {
        'name': 'type',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'title',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'sub-title',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'pre-subtitle',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'icon',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'icon-color',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'subtitle-large',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'data',
        'type': 'Object',
        'default': null,
        'scource': null
      },
      {
        'name': 'option',
        'type': 'Object',
        'default': null,
        'scource': null
      },
      {
        'name': 'gradient',
        'type': 'Boolean',
        'default': false,
        'scource': null
      },
      {
        'name': 'gradientSet',
        'type': 'Array',
        'default': [],
        'scource': null
      },
      {
        'name': 'linearStroke',
        'type': 'Array',
        'default': [500, 0, 100, 0],
        'scource': null
      },
      {
        'name': 'height',
        'type': 'Number',
        'default': 100,
        'scource': null
      }
    ]
  },
  'box-chart': {
    'props': [
      {
        'name': 'type',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'title',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'sub-title',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'icon',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'icon-color',
        'type': 'String',
        'default': null,
        'scource': null
      },
      {
        'name': 'data',
        'type': 'Object',
        'default': null,
        'scource': null
      },
      {
        'name': 'option',
        'type': 'Object',
        'default': null,
        'scource': null
      },
      {
        'name': 'gradient',
        'type': 'Boolean',
        'default': false,
        'scource': null
      },
      {
        'name': 'gradientSet',
        'type': 'Array',
        'default': [],
        'scource': null
      },
      {
        'name': 'linearStroke',
        'type': 'Array',
        'default': [500, 0, 100, 0],
        'scource': null
      },
      {
        'name': 'height',
        'type': 'Number',
        'default': 100,
        'scource': null
      }
    ]
  }
}
