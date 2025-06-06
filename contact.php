<?php
// Définir les variables et initialiser avec des valeurs vides
$name = $email = $subject = $message = "";
$nameErr = $emailErr = $subjectErr = $messageErr = "";
$response = array();

// Vérifier si la requête est de type POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Valider le nom
    if (empty($_POST["name"])) {
        $nameErr = "Le nom est requis";
    } else {
        $name = test_input($_POST["name"]);
        // Vérifier si le nom contient uniquement des lettres et des espaces
        if (!preg_match("/^[a-zA-ZÀ-ÿ ]*$/", $name)) {
            $nameErr = "Seuls les lettres et les espaces blancs sont autorisés";
        }
    }
    
    // Valider l'email
    if (empty($_POST["email"])) {
        $emailErr = "L'email est requis";
    } else {
        $email = test_input($_POST["email"]);
        // Vérifier si l'adresse e-mail est bien formée
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Format d'email invalide";
        }
    }
    
    // Valider le sujet
    if (empty($_POST["subject"])) {
        $subjectErr = "Le sujet est requis";
    } else {
        $subject = test_input($_POST["subject"]);
    }
    
    // Valider le message
    if (empty($_POST["message"])) {
        $messageErr = "Le message est requis";
    } else {
        $message = test_input($_POST["message"]);
    }
    
    // Si aucune erreur, procéder à l'envoi du mail
    if (empty($nameErr) && empty($emailErr) && empty($subjectErr) && empty($messageErr)) {
        // Dans un environnement réel, vous utiliseriez la fonction mail() de PHP
        // mail($to, $subject, $message_body, $headers);
        
        // Pour les besoins de la démonstration, nous simulons un envoi réussi
        $response["success"] = true;
        $response["message"] = "Votre message a été envoyé avec succès!";
        
        // Enregistrer le message dans un fichier log (pour démonstration)
        $log_file = "contact_log.txt";
        $log_message = "Date: " . date("Y-m-d H:i:s") . "\n";
        $log_message .= "Nom: " . $name . "\n";
        $log_message .= "Email: " . $email . "\n";
        $log_message .= "Sujet: " . $subject . "\n";
        $log_message .= "Message: " . $message . "\n";
        $log_message .= "------------------------------\n";
        
        // Écrire dans le fichier log
        file_put_contents($log_file, $log_message, FILE_APPEND);
    } else {
        $response["success"] = false;
        $response["message"] = "Il y a des erreurs dans le formulaire.";
        $response["errors"] = array(
            "name" => $nameErr,
            "email" => $emailErr,
            "subject" => $subjectErr,
            "message" => $messageErr
        );
    }
    
    // Renvoyer la réponse en JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Fonction pour nettoyer et valider les données
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
