// This is the Python sidebar, see core_versioned_sidebars for Groovy
module.exports = {
  mainSidebar: [
    'docs/intro',
    'docs/conceptual/deephaven-overview',
    {
      'Getting Started': [
        'docs/tutorials/quickstart',
        {
          'Advanced Installation': [
            'docs/tutorials/docker-install',
            'docs/tutorials/pip-install',
            'docs/how-to-guides/launch-build',
            'docs/how-to-guides/install-and-run-natively',
          ],
        },
      ],
    },
    {
      'User Guides': [
        {
          Architecture: [
            'docs/conceptual/deephaven-core-api',
            'docs/conceptual/data-types',
            'docs/conceptual/dag',
            'docs/conceptual/table-types',
            'docs/conceptual/table-update-model',
            'docs/conceptual/technical-building-blocks',
          ],
        },
        {
          'User interface': [
            'docs/how-to-guides/user-interface/add-clickable-links',
            'docs/how-to-guides/user-interface/markdown-widget',
            'docs/how-to-guides/user-interface/file-explorer',
            'docs/how-to-guides/user-interface/filters',
            'docs/how-to-guides/user-interface/chart-builder',
            'docs/how-to-guides/upload-table',
            'docs/how-to-guides/user-interface/select-distinct-values',
            'docs/how-to-guides/set-date-time-format',
            'docs/how-to-guides/user-interface/work-with-columns',
            'docs/how-to-guides/user-interface/work-with-rows',
          ],
        },
        {
          'Data import / export': [
            {
              CSV: [
                'docs/how-to-guides/data-import-export/csv-import',
                'docs/how-to-guides/data-import-export/csv-export',
              ],
            },
            {
              Kafka: [
                'docs/conceptual/kafka-in-deephaven',
                'docs/conceptual/kafka-basic-terms',
                'docs/how-to-guides/data-import-export/kafka-stream',
                'docs/how-to-guides/data-import-export/kafka-custom-parser',
              ],
            },
            {
              Parquet: [
                'docs/conceptual/parquet-formats',
                'docs/how-to-guides/data-import-export/parquet-single',
                'docs/how-to-guides/data-import-export/parquet-directory',
              ],
            },
            {
              SQL: [
                'docs/how-to-guides/data-import-export/execute-sql-queries',
              ],
            },
            {
              URIs: ['docs/how-to-guides/use-uris'],
            },
          ],
        },
        {
          'Create tables': [
            'docs/how-to-guides/empty-table',
            'docs/how-to-guides/function-generated-tables',
            'docs/how-to-guides/rollup-table',
            'docs/how-to-guides/tree-table',
            'docs/how-to-guides/new-table',
            'docs/how-to-guides/ring-table',
            'docs/how-to-guides/time-table',
            'docs/how-to-guides/input-tables',
            'docs/how-to-guides/replay-data',
            'docs/how-to-guides/table-publisher',
            'docs/how-to-guides/dynamic-table-writer',
          ],
        },
        {
          'Table operations': [
            'docs/how-to-guides/metadata',
            'docs/how-to-guides/table-listeners-python',
            'docs/how-to-guides/extract-table-value',
            {
              Filter: [
                'docs/how-to-guides/use-filters',
                'docs/how-to-guides/regex',
              ],
            },
            {
              'Group and aggregate': [
                'docs/how-to-guides/dedicated-aggregations',
                'docs/how-to-guides/combined-aggregations',
                'docs/how-to-guides/grouping-data',
                'docs/how-to-guides/partition-by',
                'docs/how-to-guides/partition-transform',
              ],
            },
            {
              Join: [
                'docs/conceptual/choose-joins',
                'docs/how-to-guides/join-two-tables',
                'docs/how-to-guides/multijoin',
              ],
            },
            {
              Merge: ['docs/how-to-guides/merge-tables'],
            },
            {
              'Partitioned tables': [
                'docs/how-to-guides/partition-by',
                'docs/how-to-guides/partition-transform',
              ],
            },
            {
              Select: [
                'docs/conceptual/choose-select-view-update',
                'docs/how-to-guides/use-select-view-update',
              ],
            },
            {
              Snapshots: [
                'docs/how-to-guides/capture-table-history',
                'docs/how-to-guides/reduce-update-frequency',
              ],
            },
            {
              'Update by': [
                'docs/how-to-guides/use-update-by',
                'docs/how-to-guides/bollinger-bands',
                'docs/how-to-guides/ema-how-to',
              ],
            },
            {
              'Work with columns': [
                'docs/how-to-guides/format-columns',
                'docs/how-to-guides/create-columns',
                'docs/how-to-guides/drop-move-rename-columns',
                'docs/how-to-guides/column-groups',
                'docs/how-to-guides/use-layout-hints',
              ],
            },
          ],
        },
        {
          'Time operations': [
            'docs/how-to-guides/data-import-export/import-data-with-date-times',
            'docs/how-to-guides/work-with-date-time',
          ],
        },
        {
          Plot: [
            'docs/how-to-guides/plotting/category',
            'docs/how-to-guides/plotting/category-histogram',
            'docs/how-to-guides/plotting/use-dynamic-plots',
            'docs/how-to-guides/plotting/histogram',
            'docs/how-to-guides/plotting/ohlc',
            'docs/how-to-guides/plotting/pie',
            'docs/how-to-guides/plotting/subplots',
            'docs/how-to-guides/plotting/treemap',
            'docs/how-to-guides/plotting/xy-series',
            'docs/how-to-guides/plotting/matplot',
            'docs/how-to-guides/plotting/seaborn',
          ],
        },
        {
          'Query expressions': [
            'docs/how-to-guides/pyobjects',
            'docs/how-to-guides/handle-null-inf-nan',
            'docs/how-to-guides/generate-query-strings',
            'docs/how-to-guides/query-language-functions',
            'docs/how-to-guides/formulas-how-to',
            'docs/how-to-guides/use-objects',
            'docs/how-to-guides/python-classes',
            'docs/how-to-guides/ternary-if-how-to',
            'docs/how-to-guides/query-scope-how-to',
            'docs/how-to-guides/work-with-arrays',
            'docs/how-to-guides/work-with-strings',
            'docs/how-to-guides/simple-python-function',
          ],
        },
        {
          'Application Mode': [
            'docs/how-to-guides/application-mode',
            'docs/how-to-guides/application-mode-libraries',
            'docs/how-to-guides/application-mode-script',
          ],
        },
        {
          Authentication: [
            'docs/how-to-guides/authentication/auth-anon',
            'docs/how-to-guides/authentication/auth-keycloak',
            'docs/how-to-guides/authentication/auth-mtls',
            'docs/how-to-guides/authentication/auth-psk',
            'docs/how-to-guides/authentication/auth-uname-pw',
          ],
        },
        {
          Configuration: [
            'docs/conceptual/docker-data-volumes',
            'docs/how-to-guides/configuration/console-service',
            'docs/how-to-guides/configuration/docker-application',
            'docs/how-to-guides/configuration/js-plugins',
            'docs/how-to-guides/configuration/native-application',
            'docs/how-to-guides/configuration/config-file',
            'docs/how-to-guides/custom-environmental-variables',
            'docs/how-to-guides/configuration/upgrade-versions',
          ],
        },
        {
          Deployment: [
            'docs/how-to-guides/aws-ec2',
            'docs/how-to-guides/gcp-linux',
          ],
        },
        {
          'Client libraries': [
            {
              Java: ['docs/how-to-guides/java-client'],
            },
          ],
        },
        {
          Integrations: [
            {
              'Artifical Intelligence': [
                'docs/how-to-guides/use-deephaven-learn',
                'docs/how-to-guides/use-pytorch',
                'docs/how-to-guides/use-scikit-learn',
                'docs/how-to-guides/use-tensorflow',
                'docs/how-to-guides/use-tensorboard-with-tf',
                'docs/how-to-guides/use-tensorboard-with-pytorch',
              ],
            },
            'docs/how-to-guides/bidirectional-plugins',
            'docs/how-to-guides/install-packages',
            {
              Java: [
                'docs/how-to-guides/install-java-packages',
                'docs/how-to-guides/read-javadocs',
                'docs/how-to-guides/use-java-packages',
              ],
            },
            {
              Python: [
                {
                  Packages: [
                    'docs/how-to-guides/install-python-packages',
                    'docs/how-to-guides/use-python-packages',
                    'docs/how-to-guides/use-jpy',
                    'docs/how-to-guides/use-numba',
                    'docs/how-to-guides/use-numpy',
                    'docs/how-to-guides/use-pandas',
                    'docs/how-to-guides/use-scipy',
                  ],
                },
              ],
            },
            'docs/how-to-guides/use-iframes',
            'docs/how-to-guides/use-jsapi',
            'docs/how-to-guides/user-interface/use-json-viewer',
            'docs/how-to-guides/jupyter',
            'docs/how-to-guides/use-plugins',
          ],
        },
        {
          Performance: [
            'docs/conceptual/ninja',
            'docs/how-to-guides/performance/barrage-performance',
            'docs/conceptual/barrage-metrics',
            'docs/how-to-guides/performance/performance-tables',
            'docs/how-to-guides/performance/garbage-collection',
            'docs/conceptual/execution-context',
            'docs/conceptual/python-java-boundary',
            'docs/conceptual/query-scope-concept',
            'docs/conceptual/query-engine/parallelization',
            'docs/conceptual/query-engine/engine-locking',
          ],
        },
        {
          Engine: ['docs/conceptual/liveness-scope-concept'],
        },
        {
          Troubleshoot: [
            'docs/how-to-guides/heap-size',
            'docs/how-to-guides/debugging/pycharm-debugging',
            'docs/how-to-guides/python-errors',
            'docs/how-to-guides/get-version',
            'docs/how-to-guides/logs',
            'docs/how-to-guides/triage-errors',
          ],
        },
      ],
    },
    {
      Reference: [
        {
          'Application Mode': [
            'docs/reference/app-mode/application-mode-config',
          ],
        },
        'docs/reference/query-language/query-library/auto-imported-functions',
        'docs/reference/python/backend-imports',
        {
          'Create tables': [
            {
              Columns: [
                'docs/reference/table-operations/create/boolCol',
                'docs/reference/table-operations/create/byteCol',
                'docs/reference/table-operations/create/charCol',
                'docs/reference/table-operations/create/dateTimeCol',
                'docs/reference/table-operations/create/doubleCol',
                'docs/reference/table-operations/create/floatCol',
                'docs/reference/table-operations/create/intCol',
                'docs/reference/table-operations/create/jobj_col',
                'docs/reference/table-operations/create/longCol',
                'docs/reference/table-operations/create/pyobj_col',
                'docs/reference/table-operations/create/shortCol',
                'docs/reference/table-operations/create/stringCol',
              ],
              Tables: [
                'docs/reference/table-operations/create/emptyTable',
                'docs/reference/table-operations/create/function_generated_table',
                'docs/reference/table-operations/create/newTable',
                'docs/reference/table-operations/create/timeTable',
                'docs/reference/table-operations/create/DynamicTableWriter',
                'docs/reference/table-operations/create/input-table',
                'docs/reference/table-operations/create/Replayer',
                'docs/reference/table-operations/create/ringTable',
                'docs/reference/table-operations/create/tree',
                'docs/reference/table-operations/create/rollup',
                'docs/reference/table-operations/create/TablePublisher',
                'docs/reference/table-operations/create/withAttributes',
                'docs/reference/table-operations/create/withoutAttributes',
              ],
            },
          ],
        },
        {
          'Data import / export': [
            {
              CSV: [
                'docs/reference/data-import-export/CSV/readCsv',
                'docs/reference/data-import-export/CSV/writeCsv',
              ],
            },
            {
              Kafka: [
                'docs/reference/data-import-export/Kafka/consume',
                'docs/reference/data-import-export/Kafka/produce',
              ],
            },
            {
              Parquet: [
                'docs/reference/data-import-export/Parquet/ColumnInstruction',
                'docs/reference/data-import-export/Parquet/readTable',
                'docs/reference/data-import-export/Parquet/writeTable',
              ],
            },
            {
              SQL: [
                'docs/reference/data-import-export/SQL/read_sql',
                'docs/reference/data-import-export/SQL/adbc',
                'docs/reference/data-import-export/SQL/odbc',
              ],
            },
            'docs/reference/uris/uri',
          ],
        },
        'docs/reference/python/deephaven-python-types',
        {
          pandas: [
            'docs/reference/pandas/to-pandas',
            'docs/reference/pandas/to-table',
          ],
        },
        {
          Performance: ['docs/reference/garbage-collect'],
        },
        {
          Plot: [
            'docs/reference/plot/one-click',
            'docs/reference/plot/one-click-partitioned-table',
            'docs/reference/plot/catPlot',
            'docs/reference/plot/catHistPlot',
            'docs/reference/plot/histPlot',
            'docs/reference/plot/ohlcPlot',
            'docs/reference/plot/piePlot',
            'docs/reference/plot/plot',
            'docs/reference/plot/plotStyle',
            'docs/reference/plot/treemapPlot',
          ],
        },
        {
          'Table operations': [
            {
              Filter: [
                'docs/reference/table-operations/filter/head',
                'docs/reference/table-operations/filter/head-pct',
                'docs/reference/table-operations/filter/slice',
                'docs/reference/table-operations/filter/slice-pct',
                'docs/reference/table-operations/filter/tail',
                'docs/reference/table-operations/filter/tail-pct',
                'docs/reference/table-operations/filter/where',
                'docs/reference/table-operations/filter/where-in',
                'docs/reference/table-operations/filter/where-one-of',
                'docs/reference/table-operations/filter/where-not-in',
              ],
            },
            {
              Sort: [
                'docs/reference/table-operations/sort/restrict-sort',
                'docs/reference/table-operations/sort/reverse',
                'docs/reference/table-operations/sort/sort',
                'docs/reference/table-operations/sort/sort-descending',
              ],
            },
            {
              'Table Listeners': [
                'docs/reference/table-operations/table-listeners/await-update',
              ],
            },
            {
              Select: [
                'docs/reference/table-operations/select/drop-columns',
                'docs/reference/table-operations/select/lazy-update',
                'docs/reference/table-operations/select/move-columns',
                'docs/reference/table-operations/select/move-columns-down',
                'docs/reference/table-operations/select/move-columns-up',
                'docs/reference/table-operations/select/rename-columns',
                'docs/reference/table-operations/select/select',
                'docs/reference/table-operations/select/select-distinct',
                'docs/reference/table-operations/select/update',
                'docs/reference/table-operations/select/update-view',
                'docs/reference/table-operations/select/view',
              ],
            },
            {
              'Group and aggregate': [
                'docs/reference/table-operations/group-and-aggregate/AbsSumBy',
                'docs/reference/table-operations/group-and-aggregate/AggAbsSum',
                'docs/reference/table-operations/group-and-aggregate/AggAllBy',
                'docs/reference/table-operations/group-and-aggregate/AggAvg',
                'docs/reference/table-operations/group-and-aggregate/aggBy',
                'docs/reference/table-operations/group-and-aggregate/AggCount',
                'docs/reference/table-operations/group-and-aggregate/AggCountDistinct',
                'docs/reference/table-operations/group-and-aggregate/AggDistinct',
                'docs/reference/table-operations/group-and-aggregate/AggFirst',
                'docs/reference/table-operations/group-and-aggregate/AggFormula',
                'docs/reference/table-operations/group-and-aggregate/AggGroup',
                'docs/reference/table-operations/group-and-aggregate/AggLast',
                'docs/reference/table-operations/group-and-aggregate/AggMax',
                'docs/reference/table-operations/group-and-aggregate/AggMed',
                'docs/reference/table-operations/group-and-aggregate/AggMin',
                'docs/reference/table-operations/group-and-aggregate/AggPartition',
                'docs/reference/table-operations/group-and-aggregate/AggPct',
                'docs/reference/table-operations/group-and-aggregate/AggSortedFirst',
                'docs/reference/table-operations/group-and-aggregate/AggSortedLast',
                'docs/reference/table-operations/group-and-aggregate/AggStd',
                'docs/reference/table-operations/group-and-aggregate/AggSum',
                'docs/reference/table-operations/group-and-aggregate/AggUnique',
                'docs/reference/table-operations/group-and-aggregate/AggVar',
                'docs/reference/table-operations/group-and-aggregate/AggWAvg',
                'docs/reference/table-operations/group-and-aggregate/AggWSum',
                'docs/reference/table-operations/group-and-aggregate/avgBy',
                'docs/reference/table-operations/group-and-aggregate/countBy',
                'docs/reference/table-operations/group-and-aggregate/firstBy',
                'docs/reference/table-operations/group-and-aggregate/groupBy',
                'docs/reference/table-operations/group-and-aggregate/headBy',
                'docs/reference/table-operations/group-and-aggregate/lastBy',
                'docs/reference/table-operations/group-and-aggregate/maxBy',
                'docs/reference/table-operations/group-and-aggregate/medianBy',
                'docs/reference/table-operations/group-and-aggregate/minBy',
                'docs/reference/table-operations/group-and-aggregate/partitionedAggBy',
                'docs/reference/table-operations/group-and-aggregate/stdBy',
                'docs/reference/table-operations/group-and-aggregate/sumBy',
                'docs/reference/table-operations/group-and-aggregate/tailBy',
                'docs/reference/table-operations/group-and-aggregate/transform',
                'docs/reference/table-operations/group-and-aggregate/ungroup',
                'docs/reference/table-operations/update-by-operations/updateBy',
                'docs/reference/table-operations/group-and-aggregate/varBy',
                'docs/reference/table-operations/group-and-aggregate/weighted-avg-by',
                'docs/reference/table-operations/group-and-aggregate/weighted-sum-by',
              ],
            },
            {
              'Partitioned Tables': [
                'docs/reference/table-operations/partitioned-tables/partitioned-table-filter',
                'docs/reference/table-operations/partitioned-tables/from-constituent-tables',
                'docs/reference/table-operations/partitioned-tables/from-partitioned-table',
                'docs/reference/table-operations/partitioned-tables/get-constituent',
                'docs/reference/table-operations/partitioned-tables/keys',
                'docs/reference/table-operations/partitioned-tables/metadata-methods',
                'docs/reference/table-operations/group-and-aggregate/partitionBy',
                'docs/reference/table-operations/partitioned-tables/partitioned-transform',
                'docs/reference/table-operations/partitioned-tables/partitioned-table-merge',
                'docs/reference/table-operations/partitioned-tables/partitioned-table-sort',
                'docs/reference/table-operations/partitioned-tables/proxy',
              ],
            },
            {
              'Update By': [
                'docs/reference/table-operations/update-by-operations/cum-max',
                'docs/reference/table-operations/update-by-operations/cum-min',
                'docs/reference/table-operations/update-by-operations/cum-prod',
                'docs/reference/table-operations/update-by-operations/cum-sum',
                'docs/reference/table-operations/update-by-operations/delta',
                'docs/reference/table-operations/update-by-operations/DeltaControl',
                'docs/reference/table-operations/update-by-operations/ema-tick',
                'docs/reference/table-operations/update-by-operations/ema-time',
                'docs/reference/table-operations/update-by-operations/emmax-tick',
                'docs/reference/table-operations/update-by-operations/emmax-time',
                'docs/reference/table-operations/update-by-operations/emmin-tick',
                'docs/reference/table-operations/update-by-operations/emmin-time',
                'docs/reference/table-operations/update-by-operations/ems-tick',
                'docs/reference/table-operations/update-by-operations/ems-time',
                'docs/reference/table-operations/update-by-operations/emstd-tick',
                'docs/reference/table-operations/update-by-operations/emstd-time',
                'docs/reference/table-operations/update-by-operations/forward-fill',
                'docs/reference/table-operations/update-by-operations/OperationControl',
                'docs/reference/table-operations/update-by-operations/rolling-avg-tick',
                'docs/reference/table-operations/update-by-operations/rolling-avg-time',
                'docs/reference/table-operations/update-by-operations/rolling-count-tick',
                'docs/reference/table-operations/update-by-operations/rolling-count-time',
                'docs/reference/table-operations/update-by-operations/rolling-group-tick',
                'docs/reference/table-operations/update-by-operations/rolling-group-time',
                'docs/reference/table-operations/update-by-operations/rolling-max-tick',
                'docs/reference/table-operations/update-by-operations/rolling-max-time',
                'docs/reference/table-operations/update-by-operations/rolling-min-tick',
                'docs/reference/table-operations/update-by-operations/rolling-min-time',
                'docs/reference/table-operations/update-by-operations/rolling-prod-tick',
                'docs/reference/table-operations/update-by-operations/rolling-prod-time',
                'docs/reference/table-operations/update-by-operations/rolling-std-tick',
                'docs/reference/table-operations/update-by-operations/rolling-std-time',
                'docs/reference/table-operations/update-by-operations/rolling-sum-tick',
                'docs/reference/table-operations/update-by-operations/rolling-sum-time',
                'docs/reference/table-operations/update-by-operations/rolling-wavg-tick',
                'docs/reference/table-operations/update-by-operations/rolling-wavg-time',
              ],
            },
            {
              Join: [
                'docs/reference/table-operations/join/aj',
                'docs/reference/table-operations/join/exact-join',
                'docs/reference/table-operations/join/full-outer-join',
                'docs/reference/table-operations/join/join',
                'docs/reference/table-operations/join/left-outer-join',
                'docs/reference/table-operations/join/multi-join',
                'docs/reference/table-operations/join/natural-join',
                'docs/reference/table-operations/join/raj',
                'docs/reference/table-operations/join/range-join',
              ],
            },
            {
              Merge: [
                'docs/reference/table-operations/merge/merge',
                'docs/reference/table-operations/merge/merge-sorted',
              ],
            },
            {
              Format: [
                'docs/reference/table-operations/format/format-columns',
                'docs/reference/table-operations/format/format-column-where',
                'docs/reference/table-operations/format/format-row-where',
                'docs/reference/table-operations/format/layout-hints',
                'docs/reference/table-operations/format/rename-columns',
              ],
            },
            {
              Snapshot: [
                'docs/reference/table-operations/snapshot/snapshot',
                'docs/reference/table-operations/snapshot/snapshot-when',
              ],
            },
            {
              Metadata: [
                'docs/reference/table-operations/metadata/attributes',
                'docs/reference/table-operations/metadata/columns',
                'docs/reference/table-operations/metadata/flatten',
                'docs/reference/table-operations/metadata/has_columns',
                'docs/reference/table-operations/metadata/is_blink',
                'docs/reference/table-operations/metadata/is_flat',
                'docs/reference/table-operations/metadata/is_refreshing',
                'docs/reference/table-operations/metadata/meta_table',
                'docs/reference/table-operations/metadata/size',
                'docs/reference/table-operations/metadata/to_string',
                'docs/reference/table-operations/metadata/update_graph',
              ],
            },
          ],
        },
        {
          'Time operations': [
            'docs/reference/time/time-window',
            {
              'Date-time': [
                'docs/reference/time/datetime/dh_now',
                'docs/reference/time/datetime/to_j_duration',
                'docs/reference/time/datetime/to_j_instant',
                'docs/reference/time/datetime/to_j_local_date',
                'docs/reference/time/datetime/to_j_local_time',
                'docs/reference/time/datetime/to_j_period',
                'docs/reference/time/datetime/to_j_time_zone',
                'docs/reference/time/datetime/to_j_zdt',
                'docs/reference/time/datetime/dh_time_zone',
                'docs/reference/time/datetime/time_zone_alias_add',
                'docs/reference/time/datetime/time_zone_alias_rm',
                'docs/reference/time/datetime/dh_today',
                'docs/reference/time/datetime/to_date',
                'docs/reference/time/datetime/to_datetime',
                'docs/reference/time/datetime/to_np_datetime64',
                'docs/reference/time/datetime/to_np_timedelta64',
                'docs/reference/time/datetime/to_pd_timestamp',
                'docs/reference/time/datetime/to_pd_timedelta',
                'docs/reference/time/datetime/to_time',
                'docs/reference/time/datetime/to_timedelta',
              ],
              calendar: [
                'docs/reference/time/calendar/calendar-names',
                'docs/reference/time/calendar/calendar/current-day',
                'docs/reference/time/calendar/calendar/day-of-week',
                'docs/reference/time/calendar/calendar/days-in-range',
                'docs/reference/time/calendar/default-calendar-name',
                'docs/reference/time/calendar/calendar/next-day',
                'docs/reference/time/calendar/calendar/number-of-days',
                'docs/reference/time/calendar/calendar/previous-day',
                'docs/reference/time/calendar/time-zone',
                /*{
                  BusinessCalendar: [
                    //'docs/reference/time/calendar/business-calendar/BusinessCalendar',
                    //'docs/reference/time/calendar/business-calendar/business-days-in-range',
                    //'docs/reference/time/calendar/business-calendar/business-schedule',
                    //'docs/reference/time/calendar/business-calendar/BusinessCalendar.is-business-day',
                    //'docs/reference/time/calendar/business-calendar/default-business-periods',
                    //'docs/reference/time/calendar/business-calendar/is-last-business-day-of-month',
                    //'docs/reference/time/calendar/business-calendar/is-last-business-day-of-week',
                    //'docs/reference/time/calendar/business-calendar/next-business-day',
                    //'docs/reference/time/calendar/business-calendar/next-non-business-day',
                    //'docs/reference/time/calendar/business-calendar/non-business-days-in-range',
                    //'docs/reference/time/calendar/business-calendar/number-of-business-days',
                    //'docs/reference/time/calendar/business-calendar/number-of-non-business-days',
                    //'docs/reference/time/calendar/business-calendar/previous-business-day',
                    //'docs/reference/time/calendar/business-calendar/previous-non-business-day',
                    //'docs/reference/time/calendar/business-calendar/standard-business-day-length',
                  ],
                  BusinessPeriod: [
                    //'docs/reference/time/calendar/business-period/end-time',
                    //'docs/reference/time/calendar/business-period/length',
                    //'docs/reference/time/calendar/business-period/start-time',
                  ],
                  BusinessSchedule: [
                    //'docs/reference/time/calendar/business-schedule/business-periods',
                    //'docs/reference/time/calendar/business-schedule/business-time-elapsed',
                    //'docs/reference/time/calendar/business-schedule/BusinessSchedule.is-business-day',
                    //'docs/reference/time/calendar/business-schedule/end-of-day',
                    //'docs/reference/time/calendar/business-schedule/is-business-time',
                    //'docs/reference/time/calendar/business-schedule/start-of-day',
                  ],
                },*/
              ],
            },
          ],
        },
        {
          'Query expressions': [
            {
              'Control flow': [
                'docs/reference/query-language/control-flow/ternary-if',
                'docs/reference/query-language/control-flow/casting',
              ],
            },
            {
              Filters: [
                {
                  'Match filters': [
                    'docs/reference/query-language/match-filters/equals',
                    'docs/reference/query-language/match-filters/not-equals',
                    'docs/reference/query-language/match-filters/icase-in',
                    'docs/reference/query-language/match-filters/icase-not-in',
                    'docs/reference/query-language/match-filters/in',
                    'docs/reference/query-language/match-filters/not-in',
                  ],
                },
              ],
            },
            {
              Formulas: ['docs/reference/query-language/formulas/formulas'],
            },
            'docs/reference/query-language/formulas/user-defined-functions',
            'docs/reference/query-language/formulas/operators',
            {
              'Query library': [
                'docs/reference/query-language/query-library/containsNonFinite',
                'docs/reference/query-language/query-library/isInf',
                'docs/reference/query-language/query-library/isNaN',
                'docs/reference/query-language/query-library/isFinite',
                'docs/reference/query-language/query-library/isNull',
                'docs/reference/query-language/query-library/len',
                'docs/reference/query-language/query-library/replaceIfNull',
              ],
            },
            {
              Types: [
                'docs/reference/query-language/types/arrays',
                'docs/reference/query-language/types/date-time',
                'docs/reference/query-language/types/durations',
                'docs/reference/query-language/types/NaNs',
                'docs/reference/query-language/types/nulls',
                'docs/reference/query-language/types/objects',
                'docs/reference/query-language/types/periods',
                'docs/reference/query-language/types/SelectableDataSet',
                'docs/reference/query-language/types/strings',
              ],
            },
            {
              Variables: [
                'docs/reference/query-language/variables/query-scope',
                'docs/reference/query-language/variables/special-variables',
              ],
            },
          ],
        },
        {
          Engine: [
            'docs/reference/engine/LivenessScope',
            'docs/reference/engine/liveness-scope',
          ],
        },
      ],
    },
    {
      'API documentation': [
        {
          type: 'link',
          label: 'Pydoc (client)',
          href: 'https://deephaven.io/core/client-api/python',
        },
        {
          type: 'link',
          label: 'Pydoc (server)',
          href: 'https://deephaven.io/core/pydoc',
        },
        {
          'Javascript API (client/server)': [
            'docs/reference/js-api/concepts',
            {
              type: 'link',
              label: 'Javascript',
              href: 'https://deephaven.io/core/client-api/javascript/modules/dh.html',
            },
          ],
        },
        {
          type: 'link',
          label: 'Javadoc (client/server)',
          href: 'https://deephaven.io/core/javadoc',
        },
        {
          type: 'link',
          label: 'Godoc',
          href: 'https://pkg.go.dev/github.com/deephaven/deephaven-core/go',
        },
        {
          type: 'link',
          label: 'C++ (client)',
          href: 'https://deephaven.io/core/client-api/cpp',
        },
        {
          type: 'link',
          label: 'C++ (examples)',
          href: 'https://deephaven.io/core/client-api/cpp-examples',
        },
        {
          type: 'link',
          label: 'R (client)',
          href: 'https://deephaven.io/core/client-api/r',
        },
      ],
    },
    {
      'Cheat sheets': [
        'docs/reference/cheat-sheets/cheat-sheet',
        'docs/reference/cheat-sheets/choose-python-packages',
        {
          'Data import / export': [
            'docs/reference/cheat-sheets/import-data-cheat-sheet',
            'docs/reference/cheat-sheets/csv',
            'docs/reference/cheat-sheets/kafka',
            'docs/reference/cheat-sheets/parquet',
            'docs/reference/cheat-sheets/uri-cheat-sheet',
          ],
        },
        'docs/reference/cheat-sheets/performance-tables-cheat-sheet',
        'docs/reference/cheat-sheets/datetime-cheat-sheet',
      ],
    },
    {
      type: 'category',
      label: 'Community questions',
      link: {
        type: 'doc',
        id: 'docs/reference/community-questions/community-questions',
      },
      items: [
        {
          General: [
            'docs/reference/community-questions/how-do-i-find-a-specific-build',
            'docs/reference/community-questions/is-it-possible-read-parquet-from-remote',
          ],
          Installation: [
            'docs/reference/community-questions/is-docker-compose-required',
          ],
          Configuration: [
            'docs/reference/community-questions/configure-dh-to-use-another-port',
            'docs/reference/community-questions/whats-minimum-amount-memory-to-allocate',
            'docs/reference/community-questions/possible-to-disable-console',
          ],
          'Table operations': [
            'docs/reference/community-questions/can-i-perform-rolling-ops-without-fixed-window-size',
            'docs/reference/community-questions/query-memoization',
          ],
          Troubleshooting: [
            'docs/reference/community-questions/can-i-reset-py-kernel-without-restarting-dh',
            'docs/reference/community-questions/monitor-dh-server-health',
          ],
          'Server-side APIs: General': [
            'docs/reference/community-questions/find-how-much-memory-a-table-is-using',
          ],
          'Server-side APIs: Python': [
            'docs/reference/community-questions/does-deephaven-stream-kafka-use-confluent',
            'docs/reference/community-questions/how-do-i-get-data-out-of-a-deephaven-table-py',
            'docs/reference/community-questions/possible-to-convert-columns-to-json',
            'docs/reference/community-questions/how-do-i-troubleshoot-type-hints',
          ],
          'Server-side APIs: Groovy': [
            'docs/reference/community-questions/utility-to-pretty-print-table',
          ],
          'Server-side APIs: Query language': [
            'docs/reference/community-questions/why-table-ops-producing-incorrect-results',
            'docs/reference/community-questions/how-do-i-shift-values-in-columns',
          ],
          'Client APIs': [
            'docs/reference/community-questions/find-password-for-ide',
          ],
        },
      ],
    },
    {
      'Need help?': [
        {
          type: 'link',
          label: 'GitHub discussions',
          href: 'https://github.com/deephaven/deephaven-core/discussions',
        },
        {
          type: 'link',
          label: 'Slack',
          href: 'https://deephaven.io/slack',
        },
      ],
    },
  ],
};
