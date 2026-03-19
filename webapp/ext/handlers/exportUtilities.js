sap.ui.define([], function () {
    "use strict";

    const EDM_META = {
        "Edm.String": { len: 255, numeric: false },
        "Edm.Guid": { len: 36, numeric: false },
        "Edm.Boolean": { len: 5, numeric: false },
        "Edm.Byte": { len: 3, numeric: true },
        "Edm.SByte": { len: 4, numeric: true },
        "Edm.Int16": { len: 6, numeric: true },
        "Edm.Int32": { len: 11, numeric: true },
        "Edm.Int64": { len: 20, numeric: true },
        "Edm.Decimal": { len: 28, numeric: true },
        "Edm.Double": { len: 24, numeric: true },
        "Edm.Single": { len: 14, numeric: true },
        "Edm.Date": { len: 10, numeric: false },
        "Edm.TimeOfDay": { len: 8, numeric: false },
        "Edm.DateTimeOffset": { len: 19, numeric: false },
    };

    return {
        resolveFieldDefs: async function (view, fieldDefCache, path) {
            if (fieldDefCache) return fieldDefCache;

            const metaModel = view.getModel().getMetaModel();
            const entityType = await metaModel.requestObject(path + "/");

            if (!entityType) {
                throw new Error("Could not read metadata for path: " + path);
            }

            const fields = [];

            for (const key of Object.keys(entityType)) {
                if (key.startsWith("$") || key.startsWith("@")) continue;

                const prop = entityType[key];
                if (!prop || typeof prop !== "object") continue;
                if (prop.$kind && prop.$kind !== "Property") continue; // skip nav props

                const type = prop.$Type || "Edm.String";
                const defaults = EDM_META[type];
                if (!defaults) continue;                 // unknown / Edm.Binary → skip

                let length = defaults.len;

                // $MaxLength wins for strings
                if (prop.$MaxLength) {
                    length = parseInt(prop.$MaxLength, 10);
                }

                // For Decimal: derive length from Precision + Scale
                if (type === "Edm.Decimal" && prop.$Precision) {
                    const precision = parseInt(prop.$Precision, 10);
                    const scale = parseInt(prop.$Scale || "0", 10);
                    length = 1 + (precision - scale) + (scale > 0 ? 1 + scale : 0);
                }

                fields.push({
                    name: key,
                    type: type,
                    len: length,
                    numeric: defaults.numeric
                });
            }

            console.log("[ListReportExt] Resolved field defs:", fields);
            return fields;
        },
        buildFixedLengthText: function (contexts, fieldDefs) {
            const lines = [];

            // Data rows
            for (const context of contexts) {
                const data = context;
                if (!data) continue;

                const row = fieldDefs.map(f => {
                    const value = this.formatValue(data[f.name], f.type);
                    return this.pad(value, f.len, f.numeric);
                }).join(" "); //add space

                lines.push(row);
            }

            return lines.join("\r\n");
        },
        pad: function (value, length, numeric) {
            const stringObject = String(value ?? "");

            if (stringObject.length === length) return stringObject;

            if (stringObject.length > length) {
                console.warn("[ListReportExt] Truncating value to fit field length:", stringObject, "→", length);
                return stringObject.substring(0, length);
            }

            const pad = " ".repeat(length - stringObject.length);
            return numeric ? pad + stringObject : stringObject + pad;
        },
        formatValue: function (raw, type) {
            if (raw === null || raw === undefined) return "";

            switch (type) {
                case "Edm.Boolean":
                    return raw ? "true" : "false";

                case "Edm.Date":
                    // data v4 already gives "YYYY-MM-DD"
                    return String(raw);

                case "Edm.TimeOfDay":
                    return String(raw).substring(0, 8);   // HH:MM:SS

                case "Edm.DateTimeOffset":
                    try {
                        // Normalise to "YYYY-MM-DD HH:MM:SS"
                        return new Date(raw).toISOString()
                            .replace("T", " ")
                            .substring(0, 19);
                    } catch (e) {
                        return String(raw);
                    }

                default:
                    return String(raw);
            }
        },
        //mimic how browser does manual download
        download: function (fileName, content) {
            const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = fileName;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 5000);
        }
    };
});