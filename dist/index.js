"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
function default_1(serviceAccount) {
    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
    const auth = app.auth();
    const db = app.firestore();
    return {
        async setProfilPictureUrl(id, url) {
            await db.collection('users').doc(id).set({
                profilPicture: url
            });
            return;
        },
        async setProfilBannerUrl(id, url) {
            await db.collection('users').doc(id).set({
                profilBanner: url
            });
            return;
        },
        async getProfilPictureUrl(id) {
            const doc = await db.collection('users').doc(id).get();
            if (doc.exists) {
                return doc.data()?.profilPicture;
            }
            return '';
        },
        async getProfilBannerUrl(id) {
            const doc = await db.collection('users').doc(id).get();
            if (doc.exists) {
                return doc.data()?.profilBanner;
            }
            return '';
        },
        verify(token, checkRevoked = false) {
            return auth.verifyIdToken(token, checkRevoked);
        },
    };
}
exports.default = default_1;
