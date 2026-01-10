---
title: "Titre du Document Juridique"
subtitle: "Sous-titre ou mention complémentaire"
author: "Votre Entreprise / Cabinet"
date: "Dernière mise à jour : 10 janvier 2026"
version: "1.0"

# Configuration Puppeteer pour Markdown Preview Enhanced
puppeteer:
  format: "A4"
  margin: 
    top: "25mm"
    bottom: "30mm"
    left: "20mm"
    right: "20mm"
  
  displayHeaderFooter: true
  
  headerTemplate: |-
    <div style="width: 100%; font-size: 8pt; color: #6b7280; text-align:  center; padding: 10px 20px; border-bottom: 1px solid #e5e7eb;">
      <span style="font-weight: 600;">Votre Entreprise</span> | 
      <span class="title"></span>
    </div>
  
  footerTemplate: |-
    <div style="width: 100%; font-size: 8pt; padding: 10px 20px; border-top: 2px solid #8b5cf6;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <img src="file:///absolute/path/to/your/assets/banners/footer-banner.png" 
               style="height: 20px; opacity: 0.8;" />
        </div>
        <div style="flex: 0; margin-right: 20px; color: #6a67ce; font-weight: 600;">
          Page <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      </div>
    </div>
  
  printBackground: true
  preferCSSPageSize: false

# Lien vers le fichier CSS
html_class: juridique-document
output: 
  pdf_document:
    path: "./exports/DOCUMENT_EXPORT.pdf"
    css:  "./styles/style-juridique. css"
---

<style>
  @import url("./styles/style-juridique.css");
</style>

<!-- ============================================
     MÉTADONNÉES DU DOCUMENT
     ============================================ -->

<div class="metadata">
  <div class="metadata-grid">
    <span class="metadata-label">Document :</span>
    <span>Titre du Document Juridique</span>
    
    <span class="metadata-label">Version :</span>
    <span>1.0</span>
    
    <span class="metadata-label">Date d'effet :</span>
    <span>10 janvier 2026</span>
    
    <span class="metadata-label">Entité concernée :</span>
    <span>Votre Entreprise SAS</span>
    
    <span class="metadata-label">Contact :</span>
    <span>contact@votreentreprise.fr</span>
  </div>
</div>

---

# TITRE PRINCIPAL DU DOCUMENT

## Préambule

Ce document définit [objectif du document].  Il entre en vigueur à compter du [date] et remplace toute version antérieure.

> **Note importante :** Cette section doit être adaptée selon le contexte de votre entreprise.  Consultez le fichier `contexte/01_CONTEXTE_PROJET.md`.

---

## Article 1 - Définitions

Les termes suivants ont la signification indiquée ci-après :

- **Client** : désigne toute personne physique ou morale qui... 
- **Services** : désigne l'ensemble des prestations proposées... 
- **Plateforme** : désigne le site web accessible à l'adresse... 

---

## Article 2 - Objet

Le présent document a pour objet de définir les conditions dans lesquelles... 

### 2.1 Sous-section

Contenu détaillé de la sous-section.

### 2.2 Autre sous-section

Autre contenu avec liste : 

1. Premier élément important
2. Deuxième élément important
3. Troisième élément important

---

## Article 3 - Conditions spécifiques

<div class="important">
  <strong>⚠️ Attention : </strong> Cette clause nécessite une attention particulière concernant...
</div>

Le texte continue ici avec les précisions nécessaires.

---

## Article 4 - Dispositions finales

### 4.1 Droit applicable

Le présent document est soumis au droit français. 

### 4.2 Juridiction compétente

Tout litige relatif à l'interprétation ou à l'exécution du présent document relève de la compétence exclusive des tribunaux de [Ville]. 

---

<div class="page-break"></div>

## Annexe A - Informations complémentaires

*(Si nécessaire)*

---

**Document généré le :** 10 janvier 2026  
**Dernière révision :** [Date]  
**Validé par :** [Nom et fonction]