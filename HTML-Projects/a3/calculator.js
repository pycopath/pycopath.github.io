function compute() {
    let validresults = [];

    let resulttable = document.getElementById("resulttable");
    resulttable.innerHTML = `
        <tr>
            <th>First Number</th>
            <th>Operator</th>
            <th>Second Number</th>
            <th>Result</th>
        </tr>
    `;

    let summarytable = document.getElementById("summarytable");
    summarytable.innerHTML = `
        <tr>
            <th>Minimum</th>
            <th>Maximum</th>
            <th>Average</th>
            <th>Total</th>
        </tr>
    `;

    do {
        let operands = prompt("enter 2 numbers separated by a space:");

        // ✅ FIRST: check for Cancel
        if (operands === null) break;

        let parts = operands.trim().split(" ");
        let x = parts[0];
        let y = parts[1];

        let operator = prompt("Enter the operator (+, -, *, /, %):");
        if (operator === null) break;

        let result;

        // Convert to numbers BEFORE checking isNaN
        let numX = parseFloat(x);
        let numY = parseFloat(y);

        if (isNaN(numX) || isNaN(numY)) {
            result = "Error: Invalid operand.";
        } else {
            switch (operator) {
                case "+":
                    result = numX + numY;
                    break;
                case "-":
                    result = numX - numY;
                    break;
                case "*":
                    result = numX * numY;
                    break;
                case "/":
                    result = numY === 0
                        ? "Error: Division by zero is undefined."
                        : numX / numY;
                    break;
                case "%":
                    result = numY === 0
                        ? "Error: Modulus by zero is undefined."
                        : numX % numY;
                    break;
                default:
                    result = "Error: Invalid operator";
            }
        }

        // Save only numeric results
        if (typeof result === "number") {
            validresults.push(result);
        }

        // Add row to table
        let newRow = resulttable.insertRow(-1);
        newRow.insertCell(0).textContent = x;
        newRow.insertCell(1).textContent = operator;
        newRow.insertCell(2).textContent = y;
        newRow.insertCell(3).textContent = result;

    } while (true);

    // SUMMARY SECTION
    let min = validresults.length ? Math.min(...validresults) : "N/A";
    let max = validresults.length ? Math.max(...validresults) : "N/A";
    let avg = validresults.length
        ? validresults.reduce((a, b) => a + b, 0) / validresults.length
        : "N/A";
    let total = validresults.length
        ? validresults.reduce((a, b) => a + b, 0)
        : "N/A";

    let summaryRow = summarytable.insertRow(-1);
    summaryRow.insertCell(0).textContent = min;
    summaryRow.insertCell(1).textContent = max;
    summaryRow.insertCell(2).textContent = avg;
    summaryRow.insertCell(3).textContent = total;
}