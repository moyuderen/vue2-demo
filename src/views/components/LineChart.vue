<template>
  <div>
    <canvas id="container">
      <div class="tooltip">
        <div>1</div>
        <div>2</div>
      </div>
    </canvas>
  </div>
</template>

<script>
import F2 from "@antv/f2";
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    value: {
      handler() {
        console.log(1);
        this.renderChart();
      },
    },
  },
  methods: {
    renderChart() {
      const colorTypes = ["#1DCF9F", "#FF2E62"];
      if (this.chart) {
        //
      } else {
        this.chart = new F2.Chart({
          id: "container",
          pixelRatio: window.devicePixelRatio,
          // padding: ["auto", "auto", "auto", "auto"],
          // appendPadding: 0,
        });
      }

      this.chart.legend(false);
      this.chart.source(this.value);
      this.chart.scale("date", {
        type: "timeCat",
        mask: "MM",
        tickCount: 6,
      });
      this.chart.scale("value", {
        tickCount: 5,
      });
      this.chart.axis("date", {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        },
      });
      this.chart.tooltip({
        custom: true,
        alwaysShow: true,
        showCrosshairs: true,
        showItemMarker: false,
        triggerOn: ["touchstart", "touchMove"],
        snap: true,
        onShow(ev) {
          // const items = ev.items;
          // console.log("items", items);
          // items[0].name = items[0].title;
        },
        onChange: (ev) => {
          console.log(ev);
          const items = ev.items;
          console.log("items", items);
          const index = this.value.indexOf(items[0].origin);
          console.log(index);
        },
        onHide: function onHide() {
          // tooltipEl.css({
          //   opacity: 0,
          // });
        },
      });
      this.chart
        .line()
        .position("date*value")
        .shape("smooth")
        .color("type", colorTypes);
      this.chart
        .point()
        .position("date*value")
        .shape("smooth")
        .style({
          stroke: "#fff",
          lineWidth: 1,
        })
        .color("type", colorTypes);

      this.chart.render();
    },
  },
};
</script>
