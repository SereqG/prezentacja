import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeDisplayProps {
  index: number;
}

const codeSnippets = [
  {
    language: "javascript",
    code: `
  function calculateBMI(weight, height) {
      if (weight <= 0 || height <= 0) {
          return "Invalid input. Weight and height must be positive numbers.";
      }
      const bmi = (weight / (height * height)).toFixed(2);
      if (bmi < 18.5) return BMI: bmi (Underweight);
      if (bmi < 24.9) return BMI: bmi (Normal weight);
      if (bmi < 29.9) return BMI: bmi (Overweight);
      return BMI: bmi (Obesity);
  }
  
  // Example usage
  console.log(calculateBMI(70, 1.75)); // Output: BMI: 22.86 (Normal weight)`,
  },
  {
    language: "python",
    code: `
def calculate_bmi(weight, height):
    if weight <= 0 or height <= 0:
        return "Invalid input. Weight and height must be positive numbers."
    bmi = round(weight / (height ** 2), 2)
    if bmi < 18.5:
        return f"BMI: {bmi} (Underweight)"
    elif bmi < 24.9:
        return f"BMI: {bmi} (Normal weight)"
    elif bmi < 29.9:
        return f"BMI: {bmi} (Overweight)"
    else:
        return f"BMI: {bmi} (Obesity)"

# Example usage
print(calculate_bmi(70, 1.75)) # Output: BMI: 22.86 (Normal weight)
`,
  },
  {
    language: "cpp",
    code: `
#include <iostream>
#include <cmath>
#include <string>

std::string calculateBMI(double weight, double height) {
    if (weight <= 0 || height <= 0) return "Invalid input. Weight and height must be positive numbers.";
    double bmi = round((weight / (height * height)) * 100) / 100;
    if (bmi < 18.5) return "BMI: " + std::to_string(bmi) + " (Underweight)";
    else if (bmi < 24.9) return "BMI: " + std::to_string(bmi) + " (Normal weight)";
    else if (bmi < 29.9) return "BMI: " + std::to_string(bmi) + " (Overweight)";
    else return "BMI: " + std::to_string(bmi) + " (Obesity)";
}

// Example usage
int main() {
    std::cout << calculateBMI(70, 1.75) << std::endl; // Output: BMI: 22.86 (Normal weight)
    return 0;
}
`,
  },
  {
    language: "java",
    code: `
public class BMICalculator {
    public static String calculateBMI(double weight, double height) {
        if (weight <= 0 || height <= 0) return "Invalid input. Weight and height must be positive numbers.";
        double bmi = Math.round((weight / (height * height)) * 100.0) / 100.0;
        if (bmi < 18.5) return "BMI: " + bmi + " (Underweight)";
        else if (bmi < 24.9) return "BMI: " + bmi + " (Normal weight)";
        else if (bmi < 29.9) return "BMI: " + bmi + " (Overweight)";
        else return "BMI: " + bmi + " (Obesity)";
    }

    public static void main(String[] args) {
        System.out.println(calculateBMI(70, 1.75)); // Output: BMI: 22.86 (Normal weight)
    }
}
`,
  },
  {
    language: "php",
    code: `
<?php
function calculateBMI($weight, $height) {
    if ($weight <= 0 || $height <= 0) {
        return "Invalid input. Weight and height must be positive numbers.";
    }
    $bmi = round($weight / ($height * $height), 2);
    if ($bmi < 18.5) return "BMI: $bmi (Underweight)";
    elseif ($bmi < 24.9) return "BMI: $bmi (Normal weight)";
    elseif ($bmi < 29.9) return "BMI: $bmi (Overweight)";
    else return "BMI: $bmi (Obesity)";
}

// Example usage
echo calculateBMI(70, 1.75); // Output: BMI: 22.86 (Normal weight)
?>
`,
  },
  {
    language: "rust",
    code: `
fn calculate_bmi(weight: f64, height: f64) -> String {
    if weight <= 0.0 || height <= 0.0 {
        return "Invalid input. Weight and height must be positive numbers.".to_string();
    }
    let bmi = (weight / (height * height) * 100.0).round() / 100.0;
    if bmi < 18.5 {
        format!("BMI: {:.2} (Underweight)", bmi)
    } else if bmi < 24.9 {
        format!("BMI: {:.2} (Normal weight)", bmi)
    } else if bmi < 29.9 {
        format!("BMI: {:.2} (Overweight)", bmi)
    } else {
        format!("BMI: {:.2} (Obesity)", bmi)
    }
}

// Example usage
fn main() {
    println!("{}", calculate_bmi(70.0, 1.75)); // Output: BMI: 22.86 (Normal weight)
}
`,
  },
];

export const CodeSnippet = ({ index }: CodeDisplayProps) => {
  const snippet = codeSnippets[index];

  if (snippet) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif" }}>
        <SyntaxHighlighter language={snippet.language} style={oneDark}>
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    );
  }
};
