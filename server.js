
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));


// ------------------------------------
// 1. CONSENT / GOVERNANCE CHECK
// ------------------------------------

function consentGovernanceCheck(user, persona, mode) {

    // Check whether user can access persona
    if (!user.allowedPersonas.includes(persona)) {
        return {
            allowed: false,
            reason: "User cannot access this persona."
        };
    }

    // Check whether selected mode is allowed
    if (!user.allowedModes.includes(mode)) {
        return {
            allowed: false,
            reason: "This mode is not allowed for this user."
        };
    }

    // Child safety rule
    if (user.isChild && mode === "advice") {
        return {
            allowed: false,
            reason: "Advice mode is restricted for child users."
        };
    }

    return {
        allowed: true,
        reason: "Consent and governance checks passed."
    };
}


// ------------------------------------
// 2. AI SAFETY / RISK CHECK
// ------------------------------------

function safetyRiskCheck(message) {

    const riskyWords = [
        "suicide",
        "kill",
        "self harm",
        "bomb",
        "weapon"
    ];

    const lowerMessage = message.toLowerCase();

    for (let word of riskyWords) {

        if (lowerMessage.includes(word)) {

            return {
                safe: false,
                reason: "Potentially unsafe content detected."
            };
        }
    }

    return {
        safe: true,
        reason: "Input passed safety check."
    };
}


// ------------------------------------
// 3. EMOTIONAL MODE
// ------------------------------------

function generateResponse(mode, message) {

    if (mode === "blessing") {

        return "May you have peace, strength and happiness in your life.";
    }

    if (mode === "story") {

        return "Once upon a time, a person faced a difficult situation but continued with courage and hope.";
    }

    if (mode === "advice") {

        return "Take a moment, understand the situation clearly, and choose the safest and most positive next step.";
    }

    return "Thank you for sharing. How can I help you further?";
}


// ------------------------------------
// 4. MAIN ECO-LIFE API
// ------------------------------------

app.post("/api/eco-life", (req, res) => {

    const {
        userId,
        persona,
        mode,
        message
    } = req.body;


    // Example user data
    const user = {
        userId: userId,

        allowedPersonas: [
            "parent",
            "friend",
            "mentor"
        ],

        allowedModes: [
            "blessing",
            "story",
            "advice"
        ],

        isChild: false
    };


    // -------------------------------
    // Consent / Governance
    // -------------------------------

    const governance =
        consentGovernanceCheck(
            user,
            persona,
            mode
        );


    if (!governance.allowed) {

        return res.status(403).json({
            success: false,
            stage: "Consent/Governance",
            message: governance.reason
        });
    }


    // -------------------------------
    // AI Safety
    // -------------------------------

    const safety =
        safetyRiskCheck(message);


    if (!safety.safe) {

        return res.status(400).json({
            success: false,
            stage: "AI Safety",
            message: safety.reason
        });
    }


    // -------------------------------
    // Generate AI response
    // -------------------------------

    const response =
        generateResponse(mode, message);


    // -------------------------------
    // Final response
    // -------------------------------

    res.json({

        success: true,

        consentGovernance: {
            status: "PASSED",
            message: governance.reason
        },

        safety: {
            status: "PASSED",
            message: safety.reason
        },

        emotionalMode: mode,

        response: response
    });

});


app.listen(3000, () => {

    console.log(
        "ECO LIFE server running at http://localhost:3000"
    );

});