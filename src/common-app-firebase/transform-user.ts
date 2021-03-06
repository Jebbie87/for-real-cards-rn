import {IUser} from 'common-app';

export function transformUser(firebaseUser: firebase.User) : IUser {
    return {
      _id: firebaseUser.uid,
      username: firebaseUser.displayName,
      emails: [
        {
          address: firebaseUser.email,
          verified: firebaseUser.emailVerified
        }
      ],
      profile: {
        name: firebaseUser.displayName,
        "avatar-original": firebaseUser.photoURL
      },
      roles: []
    }
}