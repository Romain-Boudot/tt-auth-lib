import * as admin from 'firebase-admin'

export default function(serviceAccount: any): {
  setProfilPictureUrl: (id: string, url: string) => Promise<void>,
  setProfilBannerUrl: (id: string, url: string) => Promise<void>
  getProfilPictureUrl: (id: string) => Promise<string>,
  getProfilBannerUrl: (id: string) => Promise<string>,
  verify: (token: string, checkRevoked?: boolean) => ReturnType<typeof auth.verifyIdToken>
} {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  })
  const auth = app.auth()
  const db = app.firestore()
  return {
    async setProfilPictureUrl(id: string, url: string) {
      await db.collection('users').doc(id).set({
        profilPicture: url
      })
      return
    },
    async setProfilBannerUrl(id: string, url: string) {
      await db.collection('users').doc(id).set({
        profilBanner: url
      })
      return
    },
    async getProfilPictureUrl(id: string) {
      const doc = await db.collection('users').doc(id).get()
      if (doc.exists) {
        return doc.data()?.profilPicture
      }
      return ''
    },
    async getProfilBannerUrl(id: string) {
      const doc = await db.collection('users').doc(id).get()
      if (doc.exists) {
        return doc.data()?.profilBanner
      }
      return ''
    },
    verify(token: string, checkRevoked = false) {
      return auth.verifyIdToken(token, checkRevoked)
    },
  }
}
