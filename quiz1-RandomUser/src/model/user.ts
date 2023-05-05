export interface UserData {
  name: {
    title: string
    first: string
    last: string
  }
  dob: {
    date: string
    age: number
  }
  nat: string
  phone: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
}
