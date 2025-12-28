import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ContratPersonnalise.css";

export default function ContratPersonnalise() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientForm: "",
    clientCapital: "",
    clientCity: "",
    clientRC: "",
    clientRep: "",
    clientRole: "",
    prestName: "",
    prestType: "",
    prestCity: "",
    prestRC: "",
    prestRep: "",
    prestRole: "",
    startDate: "",
    signDate: "",
    montant: "",
  });

  const previewRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    try {
      const element = previewRef.current;
      if (!element) {
        alert("Erreur: L'aperçu du contrat n'est pas disponible pour la conversion.");
        return;
      }

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let position = 0;
      let heightLeft = pdfHeight;
      
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`Contrat_${formData.clientName || "Client"}.pdf`);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF. Vérifiez la console pour plus de détails.");
    }
  };

  const { clientName, clientForm, clientCapital, clientCity, clientRC, clientRep, clientRole, prestName, prestType, prestCity, prestRC, prestRep, prestRole, startDate, signDate, montant } = formData;

  const defaultClientName = "AutoTech S.A.";
  const defaultPrestName = "Monotools SARL";
  const defaultClientCity = "Paris";
  
  const displayStartDate = startDate ? new Date(startDate).toLocaleDateString("fr-FR") : "1 novembre 2025";
  const displaySignDate = signDate ? new Date(signDate).toLocaleDateString("fr-FR") : "1 novembre 2025";


  return (
    <div className="contrat-container">
      <h1 className="page-title">Formulaire de Contrat de Prestation</h1>

      <form className="form-grid">
        <h2>Informations du Client</h2>
        <input name="clientName" placeholder="Nom de l’entreprise" onChange={handleChange} value={clientName} />
        <input name="clientForm" placeholder="Forme juridique" onChange={handleChange} value={clientForm} />
        <input name="clientCapital" placeholder="Capital social (DA)" onChange={handleChange} value={clientCapital} />
        <input name="clientCity" placeholder="Ville" onChange={handleChange} value={clientCity} />
        <input name="clientRC" placeholder="N° RC" onChange={handleChange} value={clientRC} />
        <input name="clientRep" placeholder="Nom du représentant" onChange={handleChange} value={clientRep} />
        <input name="clientRole" placeholder="Fonction du représentant" onChange={handleChange} value={clientRole} />

        <h2>Informations du Prestataire</h2>
        <input name="prestName" placeholder="Nom du prestataire" onChange={handleChange} value={prestName} />
        <input name="prestType" placeholder="Type d’activité" onChange={handleChange} value={prestType} />
        <input name="prestCity" placeholder="Ville" onChange={handleChange} value={prestCity} />
        <input name="prestRC" placeholder="N° RC" onChange={handleChange} value={prestRC} />
        <input name="prestRep" placeholder="Nom du représentant" onChange={handleChange} value={prestRep} />
        <input name="prestRole" placeholder="Fonction du représentant" onChange={handleChange} value={prestRole} />

        <h2>Détails du Contrat</h2>
        <input name="startDate" type="date" onChange={handleChange} value={startDate} />
        <input name="signDate" type="date" onChange={handleChange} value={signDate} />
        <input name="montant" placeholder="Montant (en DA)" onChange={handleChange} value={montant} />
      </form>

      <div ref={previewRef} className="contract-preview">
        {clientName && prestName ? (
          <>
            <h2 className="contract-title">Contrat de Prestation de Services - Outil de Veille Automobile</h2>

            <p>
              Entre les soussignés :
            </p>
            <p>
              <strong>{clientName || defaultClientName}</strong>, {clientForm} au capital de {clientCapital} DA, ayant son siège social à {clientCity}, immatriculée au RC {clientRC}, représentée par {clientRep}, {clientRole}, ci-après dénommée « le Client »,
            </p>
            <p>
              Et : <strong>{prestName || defaultPrestName}</strong>, {prestType}, sise à {prestCity}, immatriculée au RC {prestRC}, représentée par {prestRep}, {prestRole}, ci-après dénommé « le Prestataire ».
            </p>

            <h3>Article 1 – Objet du contrat</h3>
            <p>
              Le présent contrat a pour objet la conception, la mise en place et la maintenance d'un outil de veille technologique
              permettant à {clientName || defaultClientName} de suivre, analyser et mettre à jour à distance les fonctionnalités de ses véhicules électriques.
            </p>

            <h3>Article 2 – Outils et technologies utilisés</h3>
            <p>
              Le Prestataire utilisera notamment :
            </p>
            <ul>
                <li>Feedly, Talkwalker, Google Alerts pour la veille technologique ;</li>
                <li>un module interne de supervision en temps réel ;</li>
                <li>des API sécurisées entre {prestName || defaultPrestName} et {clientName || defaultClientName}.</li>
            </ul>
            
            <h3>Article 3 – Durée et Calendrier</h3>
            <p>
              Le contrat prend effet à compter du **{displayStartDate}** pour une durée initiale de **six (6) mois**, renouvelable tacitement.
            </p>

            <h3>Article 4 – Livrables</h3>
            <ul>
                <li>Outil de veille fonctionnel ;</li>
                <li>Rapport technique mensuel ;</li>
                <li>Documentation complète.</li>
            </ul>
            
            <h3>Article 5 – Confidentialité et Propriété</h3>
            <p>
              Les parties s’engagent à conserver confidentielles toutes les données obtenues dans le cadre de l’exécution du présent contrat. **L'outil devient la propriété du Client après paiement complet.**
            </p>

            <h3>Article 6 – Conditions Financières</h3>
            <p>
              Le montant total de la prestation est fixé à **350 000 € HT**, payable selon les modalités suivantes : **40 % à la signature, 40 % à la livraison, 20 % après validation finale.**
            </p>

            <h3>Article 7 – Signatures</h3>
            <p className="contract-signature">
              Fait à {clientCity || defaultClientCity}, le {displaySignDate}.
            </p>

            <div className="signature-section">
              <div className="signature-block">
                <strong>Pour {clientName || defaultClientName}</strong>
                <p>{clientRep}</p>
                <p>{clientRole}</p>
                <div className="signature-line"></div>
                <p className="signature-label">Signature</p>
              </div>

              <div className="signature-block">
                <strong>Pour {prestName || defaultPrestName}</strong>
                <p>{prestRep}</p>
                <p>{prestRole}</p>
                <div className="signature-line"></div>
                <p className="signature-label">Signature</p>
              </div>
            </div>
          </>
        ) : (
          <p className="empty-preview">Veuillez remplir le formulaire pour afficher le contrat.</p>
        )}
      </div>

      {clientName && prestName && (
        <button onClick={generatePDF} className="btn-download">
          Télécharger le contrat en PDF
        </button>
      )}
    </div>
  );
}