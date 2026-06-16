//
//  LiveActivitySample.swift
//  Trip Identifier Portfolio Samples
//
//  This non-sensitive excerpt demonstrates the ActivityKit / Dynamic Island
//  pattern used to display a fast trip recommendation. It uses placeholder
//  state and intentionally excludes proprietary recommendation algorithms.
//

import ActivityKit
import SwiftUI
import WidgetKit

@available(iOS 16.1, *)
struct TripAnalysisAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var recommendationTitle: String
        var takeHomeText: String
        var hourlyText: String
        var durationText: String
        var severity: RecommendationSeverity
    }

    var sourceName: String
}

enum RecommendationSeverity: String, Codable, Hashable {
    case positive
    case caution
    case avoid

    var tint: Color {
        switch self {
        case .positive: return Color(red: 0.10, green: 0.75, blue: 0.45)
        case .caution: return Color(red: 0.86, green: 0.55, blue: 0.10)
        case .avoid: return Color(red: 0.90, green: 0.20, blue: 0.18)
        }
    }
}

@available(iOS 16.1, *)
final class TripAnalysisLiveActivityController {
    private var activity: Activity<TripAnalysisAttributes>?

    func start(sourceName: String, state: TripAnalysisAttributes.ContentState) {
        let attributes = TripAnalysisAttributes(sourceName: sourceName)
        let content = ActivityContent(state: state, staleDate: nil)
        activity = try? Activity.request(attributes: attributes, content: content, pushType: nil)
    }

    func update(with state: TripAnalysisAttributes.ContentState) async {
        guard let activity else { return }
        await activity.update(ActivityContent(state: state, staleDate: nil))
    }

    func end() async {
        guard let activity else { return }
        await activity.end(nil, dismissalPolicy: .immediate)
        self.activity = nil
    }
}

@available(iOS 16.1, *)
struct TripAnalysisLiveActivityWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: TripAnalysisAttributes.self) { context in
            LockScreenTripAnalysisView(state: context.state)
                .activityBackgroundTint(Color(.secondarySystemBackground))
                .activitySystemActionForegroundColor(context.state.severity.tint)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Text(context.state.recommendationTitle)
                        .font(.headline.weight(.bold))
                        .foregroundStyle(context.state.severity.tint)
                }

                DynamicIslandExpandedRegion(.trailing) {
                    Text(context.state.takeHomeText)
                        .font(.title3.monospacedDigit().weight(.bold))
                }

                DynamicIslandExpandedRegion(.bottom) {
                    HStack {
                        Label(context.state.durationText, systemImage: "clock")
                        Spacer()
                        Label(context.state.hourlyText, systemImage: "speedometer")
                    }
                    .font(.caption.weight(.semibold))
                }
            } compactLeading: {
                Circle()
                    .fill(context.state.severity.tint)
                    .frame(width: 14, height: 14)
            } compactTrailing: {
                Text(context.state.takeHomeText)
                    .font(.caption2.monospacedDigit().weight(.black))
                    .foregroundStyle(context.state.severity.tint)
            } minimal: {
                Circle()
                    .fill(context.state.severity.tint)
            }
        }
    }
}

@available(iOS 16.1, *)
private struct LockScreenTripAnalysisView: View {
    let state: TripAnalysisAttributes.ContentState

    var body: some View {
        HStack(spacing: 14) {
            Circle()
                .fill(state.severity.tint)
                .frame(width: 14, height: 14)

            VStack(alignment: .leading, spacing: 4) {
                Text(state.recommendationTitle)
                    .font(.headline.weight(.bold))
                Text("\(state.hourlyText) · \(state.durationText)")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text(state.takeHomeText)
                .font(.title2.monospacedDigit().weight(.black))
                .foregroundStyle(state.severity.tint)
        }
        .padding()
    }
}
