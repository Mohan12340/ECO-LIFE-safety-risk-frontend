async function sendMessage() {

    const userId =
        document.getElementById("userId").value;

    const persona =
        document.getElementById("persona").value;

    const mode =
        document.getElementById("mode").value;

    const message =
        document.getElementById("message").value;


    if (message.trim() === "") {

        alert("Please enter a message.");

        return;
    }


    const response = await fetch(
        "/api/eco-life",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                userId: userId,

                persona: persona,

                mode: mode,

                message: message

            })

        }
    );


    const data = await response.json();


    const result =
        document.getElementById("result");


    if (!data.success) {

        result.innerHTML = `

            <h3>❌ Request Blocked</h3>

            <p>
                <b>Stage:</b>
                ${data.stage}
            </p>

            <p>
                ${data.message}
            </p>

        `;

        return;
    }


    result.innerHTML = `

        <h3>✅ Request Approved</h3>

        <p>
            <b>Consent/Governance:</b>
            ${data.consentGovernance.status}
        </p>

        <p>
            ${data.consentGovernance.message}
        </p>

        <p>
            <b>AI Safety:</b>
            ${data.safety.status}
        </p>

        <p>
            ${data.safety.message}
        </p>

        <p>
            <b>Emotional Mode:</b>
            ${data.emotionalMode}
        </p>

        <hr>

        <p>
            <b>ECO LIFE Response:</b>
        </p>

        <p>
            ${data.response}
        </p>

    `;
}