//
//  SwiftUIDashboardSample.swift
//  Trip Identifier Portfolio Samples
//
//  This non-sensitive excerpt demonstrates a SwiftUI dashboard structure with
//  state-driven UI, mode switching, and reusable cards. The values are demo
//  placeholders and do not include production scoring or earnings formulas.
//

import SwiftUI

struct DashboardState {
    var isTargetModeEnabled: Bool
    var isShiftRunning: Bool
    var currentNetText: String
    var shiftTimeText: String
    var latestRecommendation: RecommendationSummary

    static let demo = DashboardState(
        isTargetModeEnabled: true,
        isShiftRunning: true,
        currentNetText: "$117.60",
        shiftTimeText: "04:12:36",
        latestRecommendation: RecommendationSummary(
            title: "Recommended",
            subtitle: "Good pace for this shift",
            takeHomeText: "$18.60",
            hourlyText: "$31/hr",
            tint: .green
        )
    )
}

struct RecommendationSummary {
    var title: String
    var subtitle: String
    var takeHomeText: String
    var hourlyText: String
    var tint: Color
}

struct DriverDashboardSampleView: View {
    @State private var state = DashboardState.demo

    var body: some View {
        NavigationStack {
            VStack(spacing: 12) {
                latestOfferCard
                modeSwitcher
                netIncomeCard
                shiftTimerCard
                Spacer()
            }
            .padding()
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Trip Identifier")
        }
    }

    private var latestOfferCard: some View {
        Card {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Latest Offer")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)

                    Text(state.latestRecommendation.title)
                        .font(.largeTitle.weight(.black))
                        .foregroundStyle(state.latestRecommendation.tint)

                    Text(state.latestRecommendation.subtitle)
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(.secondary)

                    Text(state.latestRecommendation.takeHomeText)
                        .font(.system(size: 48, weight: .black, design: .rounded))
                        .monospacedDigit()
                }

                Spacer()

                VStack(spacing: 10) {
                    MetricTile(title: "Hourly", value: state.latestRecommendation.hourlyText)
                    MetricTile(title: "Time", value: "26 min")
                }
            }
        }
    }

    private var modeSwitcher: some View {
        HStack(spacing: 10) {
            ModeButton(
                title: "Basic Mode",
                isSelected: !state.isTargetModeEnabled
            ) {
                state.isTargetModeEnabled = false
            }

            ModeButton(
                title: "Target Mode",
                isSelected: state.isTargetModeEnabled
            ) {
                state.isTargetModeEnabled = true
            }
        }
    }

    private var netIncomeCard: some View {
        Card {
            VStack(alignment: .leading, spacing: 8) {
                Text(state.isTargetModeEnabled ? "Shift Net Income" : "Current Estimated Net")
                    .font(.headline)

                Text(state.currentNetText)
                    .font(.system(size: 46, weight: .black, design: .rounded))
                    .monospacedDigit()

                if state.isTargetModeEnabled {
                    ProgressView(value: 0.78)
                        .tint(.green)
                }
            }
        }
    }

    private var shiftTimerCard: some View {
        Card {
            HStack {
                VStack(alignment: .leading) {
                    Text(state.shiftTimeText)
                        .font(.system(size: 38, weight: .black, design: .monospaced))
                    Text(state.isShiftRunning ? "Online" : "Paused")
                        .font(.subheadline.weight(.semibold))
                        .foregroundStyle(state.isShiftRunning ? .green : .secondary)
                }

                Spacer()

                Button(state.isShiftRunning ? "Pause" : "Go Online") {
                    state.isShiftRunning.toggle()
                }
                .buttonStyle(.borderedProminent)
            }
        }
    }
}

private struct Card<Content: View>: View {
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.secondarySystemGroupedBackground))
            .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
    }
}

private struct MetricTile: View {
    let title: String
    let value: String

    var body: some View {
        VStack(spacing: 4) {
            Text(title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(.secondary)
            Text(value)
                .font(.headline.monospacedDigit().weight(.bold))
        }
        .frame(width: 92, height: 68)
        .background(Color(.tertiarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
    }
}

private struct ModeButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline.weight(.bold))
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
        }
        .buttonStyle(.plain)
        .foregroundStyle(isSelected ? .white : .primary)
        .background(isSelected ? Color.green : Color(.secondarySystemGroupedBackground))
        .clipShape(Capsule())
    }
}
