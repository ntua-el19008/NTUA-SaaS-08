import * as shared from "../shared/blueprints.js";

import type { Blueprint } from "../shared/interfaces.js";

export const blueprint: Blueprint = {
    caption: shared.captionBlueprint,
    chart: shared.chartBlueprint,
    legend: shared.legendBlueprint,
    series: {
        ...shared.seriesBlueprint,
        data: {
            word: [
                {
                    type: "string",
                },
            ],
            weight: [
                {
                    type: "number",
                },
            ],
        },
    },
    subtitle: shared.subtitleBlueprint,
    title: shared.titleBlueprint,
    xAxis: shared.xAxisBlueprint,
    yAxis: shared.yAxisBlueprint,
};