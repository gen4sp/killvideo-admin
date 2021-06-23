import _ from 'lodash'

const iconPath = '/icons/filetypes'

// pink red orange green cyan blue purple
export const mediaTypeCategories = {
  image: {
    title: 'Images',
    type: 'image',
    color: 'pink',
    accept: '.jpg, .png',
    icon: `${iconPath}/image.png`
  },
  audio: {
    title: 'Sounds',
    type: 'audio',
    color: 'orange',
    accept: '.mp3, .wav',
    icon: `${iconPath}/audio.png`
  },
  // 'video': {
  //     title: 'Videos',
  //     type:'video',
  //   color: 'green',
  //     accept: '.mp4',
  //     icon: `${iconPath}/video.png`
  // },
  psd: {
    title: 'PSDs',
    type: 'psd',
    color: 'cyan',
    accept: '.psd',
    icon: `${iconPath}/psd.png`
  },
  vector: {
    title: 'Vectors',
    type: 'vector',
    color: 'blue',
    accept: '.ai, .eps',
    icon: `${iconPath}/curves.png`
  }
}
const colors = _.transform(
  mediaTypeCategories,
  (t, v, k) => {
    t[k] = v.color
    return t
  },
  {}
)
console.log(colors)
export const mediaTypesCategoriesArray = _.map(
  mediaTypeCategories,
  (value, id) => {
    return { id, key: id, value: value.title, ...value }
  }
)
function getType(type) {
  console.log('tt', type)
  if (type === 'psd' || _.startsWith(type, 'image/vnd.adobe.photoshop')) {
    return mediaTypeCategories.psd
  } else if (_.startsWith(type, 'image')) {
    return mediaTypeCategories.image
  } else if (_.startsWith(type, 'audio')) {
    return mediaTypeCategories.audio
  } else if (_.startsWith(type, 'video')) {
    return mediaTypeCategories.video
  } else if (type === 'pdf' || _.startsWith(type, 'pdf')) {
    return mediaTypeCategories.pdf
  } else if (
    type === 'vector' ||
    _.startsWith(type, 'application/postscript')
  ) {
    return mediaTypeCategories.vector
  } else {
    return null
  }
}

function getColor(mediatype) {
  return colors[mediatype]
}
// function getAccept(){
//     return _.map(mediaTypeCategories, (v, k) => v.accept)
// }

export default {
  getType,
  mediaTypeCategories,
  mediaTypesCategoriesArray,
  getColor
  //   getAccept,
}
