//
//  VisionOCRSample.swift
//  Trip Identifier Portfolio Samples
//
//  This non-sensitive excerpt demonstrates how the app uses Apple's Vision
//  framework to run on-device OCR over a trip-offer screenshot. Proprietary
//  parsing, pricing, scoring, and risk labeling logic has been omitted.
//

import UIKit
import Vision

/// Lightweight output that can be passed to a separate parser.
/// The production app converts these lines into structured offer fields.
struct RecognizedOfferText {
    let lines: [String]

    var fullText: String {
        lines.joined(separator: "\n")
    }
}

enum OfferTextRecognitionError: Error {
    case missingCGImage
    case visionFailed(Error)
}

/// Runs Vision text recognition on-device.
///
/// Notes for portfolio reviewers:
/// - No screenshots are uploaded to a server in this sample.
/// - This file intentionally stops at OCR extraction.
/// - The production scoring and decision engine is not included.
final class OfferTextRecognizer {
    func recognizeText(in screenshot: UIImage) async throws -> RecognizedOfferText {
        guard let cgImage = screenshot.cgImage else {
            throw OfferTextRecognitionError.missingCGImage
        }

        return try await withCheckedThrowingContinuation { continuation in
            let request = VNRecognizeTextRequest { request, error in
                if let error {
                    continuation.resume(throwing: OfferTextRecognitionError.visionFailed(error))
                    return
                }

                let observations = request.results as? [VNRecognizedTextObservation] ?? []
                let lines = observations.compactMap { observation in
                    observation.topCandidates(1).first?.string
                }

                continuation.resume(returning: RecognizedOfferText(lines: lines))
            }

            request.recognitionLevel = .accurate
            request.usesLanguageCorrection = false
            request.recognitionLanguages = ["en-US"]

            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            do {
                try handler.perform([request])
            } catch {
                continuation.resume(throwing: OfferTextRecognitionError.visionFailed(error))
            }
        }
    }
}

/// Example of the safe boundary between OCR and business logic.
/// In the production app, this step is followed by private parsing and
/// recommendation logic that is intentionally not part of the public repo.
struct PublicOfferParsingPreview {
    let fareText: String?
    let timeText: String?
    let distanceText: String?
    let ratingText: String?

    init(recognizedText: RecognizedOfferText) {
        let lines = recognizedText.lines

        fareText = lines.first { $0.contains("$") }
        timeText = lines.first { $0.localizedCaseInsensitiveContains("min") }
        distanceText = lines.first {
            $0.localizedCaseInsensitiveContains("km") ||
            $0.localizedCaseInsensitiveContains("mi")
        }
        ratingText = lines.first { line in
            line.range(of: #"^\d\.\d{1,2}$"#, options: .regularExpression) != nil
        }
    }
}
