const PACKAGE_BASE = 'smali/com/jodelapp/jodelandroidv3'

const targets = {
  'utilities.UniqueDeviceIdentifier': {
    methods: [
      {
        name: 'getUDI',
        filter: /\.method public (?!getValue)(\w+)\(\)Ljava\/lang\/String;/g
      }
    ]
  },
  'model.Storage': {
    methods: [
      {
        name: 'UnlockFeatures',
        filter: /\.method public (\w+)\(Ljava\/lang\/String;\)Z/g,
        implementationFilter: /features/g
      }
    ]
  },
  'view.adapter.PostDetailRecyclerAdapter': {
    methods: [
      {
        name: 'TrackPostsMethod',
        filter: /\.method public (\w+)\(Lcom\/jodelapp\/jodelandroidv3\/view\/adapter\/PostDetailRecyclerAdapter\$PostViewHolder;I\)V/g
      }
    ]
  },
  'features.mymenu.MyMenuPresenter': {
    methods: [
      {
        name: 'AddEntriesMethod',
        filter: /\.method private (\w+)\(\)Ljava\/util\/List;/g
      },
      {
        name: 'HandleClickEventsMethod',
        filter: /\.method public (\w+)\(Lcom\/jodelapp\/jodelandroidv3\/view\/MyMenuItem;\)V/g
      }
    ]
  },
  'view.gesture.JodelGestureListener': {
    fields: [
      {
        name: 'GestureListener_Post',
        filter: /\.field protected (\w+):Lcom\/jodelapp\/jodelandroidv3\/api\/model\/Post;/g
      }
    ]
  }
}

module.exports = {
  targets,
  PACKAGE_BASE
}
