# Mise en place et utilisation du backend

## Installer les dépendances:
```bash
pnpm install
```

## Créer une base de données psql

Appeler votre base de données 'qualiextra' pour simplifier le process.

```sql
create database "qualiextra" owner "votre nom d'utilisateur";
```

## Configuration du .env:

Copier le fichier .env.example et le renommer '.env'.
Remplacer les variables par les valeurs de votre configuration.

'DB_URL': 
-remplacer le champs username par votre nom d'utilisateur.
-remplacer le champs password par votre mot de passe.
-remplacer le champs database par votre nom de base de données (qualiextra).

'JWT_SECRET': remplacer par votre clé secrète (J'utilise un UUID pour plus de sécurité).

'EMAIL_HOST': remplacer par votre serveur SMTP.
'EMAIL_PORT': remplacer par le port de votre serveur SMTP.
'EMAIL_USER': remplacer par votre adresse email.
'EMAIL_PASS': remplacer par votre mot de passe.
'EMAIL_FROM_NAME': remplacer par le nom du service qui envoie les emails.
'EMAIL_FROM_ADDRESS': remplacer par l'adresse email du service qui envoie les emails.

'VERIFICATION_URL': remplacer par l'URL de votre application, dans ce projet 'http://localhost:3000/api/auth/verify'.
Pour une configuration de test simple et rapide, utiliser [ethereal](https://ethereal.email/). et cliquer sur 'Create Ethereal account'.
**Si vous utilisez ethereal, les mails seront envoyés à l'adresse email d'ethereal, peu importe le mail que vous avez mis en tant que destinataire.**

## Confiduration du package.json:

Pour les commandes db:seed, il faut remplacer 'nicolas' par votre nom d'utilisateur postgresql.

```json
{
  "scripts": {
    "dev": "nodemon",
    "db:init": "node migrations/createTables.js",
    "db:seed": "psql -U nicolas -d qualiextra -f ./migrations/user-seed.sql",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## Initialisation de la base de données:
```bash
pnpm db:init
```

## Initialisation des données de test:
```bash
pnpm db:seed
```

## Lancer le serveur:
```bash
pnpm dev
```
## Accéder à swagger:

Cliquez sur le lien dans le terminal ou aller sur [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Données de test pour swagger:

- Admin : 
  - Alice   | id: 15a3b0eb-3747-4d26-8286-98956a7876d2 | email: alice@example.com   | password: password123  | verified_user
- Users : 
  - Bob     | id: cfd9361b-5db7-45dc-9c6a-9a3f4f2e4ca0 | email: bob@example.com     | password: securepass   | unverified_user
  - Charlie | id: 2ebb7d6a-bd24-4d67-a09c-e0b2b49df660 | email: charlie@example.com | password: securepass   | verified_user

## Informations pratiques:

- Lors de l'utilisation de la route **/login**, le **token** est retourné dans la réponse.
  Il faut le **copier**, **cliquer** sur **'Authorize'** et le **coller** dans le champ **'Value'** et se **login**.

- Lors de l'utilisation de la route **/register**, le **token de vérification** est retourné dans la réponse.
  Il faut le **copier** et le **coller** dans la route **/verify**. (Ou cliquer sur le lien dans le mail de vérification).

- Si vous souhaiter envoyer un mail via une adresse gmail, il faut, depuis le 1er janvier 2025, OAuth2.0.
 [https://developers.google.com/identity/protocols/oauth2/web-server?hl=fr](https://developers.google.com/identity/protocols/oauth2/web-server?hl=fr)