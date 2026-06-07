/* Module Thưởng / Phạt — vcard */
(function () {
  const DS = window.LAPayrollDesignSystem_59f88b;
  const { Card, Button, Badge, AmountDisplay } = DS;
  const { Modal, PeriodPicker, usePeriod, VCardGrid, VCard, VCardHead, VCardRows, VCardField, EmptyState } = window.LuaShared;
  const { fmtDate, canWrite } = window.LuaUtils;
  const api = window.LuaAPI;

  function BonusesScreen({ user }) {
    const { year, month, setPeriod } = usePeriod();
    const [records, setRecords] = React.useState([]);
    const [stats, setStats] = React.useState({ total_bonus: 0, total_penalty: 0 });
    const [employees, setEmployees] = React.useState([]);
    const [modal, setModal] = React.useState(null);
    const [err, setErr] = React.useState('');
    const write = canWrite(user?.role, 'bonuses');

    const load = React.useCallback(() => {
      Promise.all([
        api.get(`/bonuses?year=${year}&month=${month}`),
        api.get(`/bonuses/summary?year=${year}&month=${month}`),
        api.get('/employees?status=active'),
      ]).then(([r, s, e]) => { setRecords(r); setStats(s); setEmployees(e); });
    }, [year, month]);

    React.useEffect(() => { load(); }, [load]);

    const save = async (f) => {
      try {
        await api.post('/bonuses', f);
        setModal(null); setErr(''); load();
      } catch (e) { setErr(e.message); }
    };

    return (
      <div>
        <div className="lw-pagehead">
          <PeriodPicker year={year} month={month} onChange={setPeriod} />
          {write && <Button variant="primary" icon="plus" onClick={() => { setModal({}); setErr(''); }}>Thêm thưởng/phạt</Button>}
        </div>
        <div className="lw-vgrid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
          <Card><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Tổng thưởng</div><AmountDisplay value={stats.total_bonus} tone="positive" /></Card>
          <Card><div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Tổng phạt</div><AmountDisplay value={stats.total_penalty} tone="negative" /></Card>
        </div>

        {!records.length ? <EmptyState>Chưa có thưởng/phạt trong tháng</EmptyState> : (
          <VCardGrid>
            {records.map((r) => (
              <VCard key={r.id}>
                <VCardHead
                  title={r.employee_name}
                  subtitle={fmtDate(r.record_date)}
                  end={<Badge tone={r.type === 'bonus' ? 'success' : 'danger'}>{r.type === 'bonus' ? 'Thưởng' : 'Phạt'}</Badge>}
                />
                <VCardRows>
                  <VCardField label="Số tiền" tone={r.type === 'bonus' ? 'pos' : 'neg'}>
                    <AmountDisplay value={r.amount} size="sm" tone={r.type === 'bonus' ? 'positive' : 'negative'} showCurrency={false} />
                  </VCardField>
                  <VCardField label="Lý do" value={r.reason || '—'} full />
                </VCardRows>
              </VCard>
            ))}
          </VCardGrid>
        )}

        {modal && (
          <Modal title="Thêm thưởng / phạt" onClose={() => setModal(null)}>
            <form className="lw-form" onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              save({
                employee_id: Number(fd.get('employee_id')),
                record_date: fd.get('record_date'),
                type: fd.get('type'),
                amount: Number(fd.get('amount')),
                reason: fd.get('reason'),
                notes: fd.get('notes'),
              });
            }}>
              {err && <div className="lw-form__err">{err}</div>}
              <label>Nhân viên<select name="employee_id" required>{employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}</select></label>
              <label>Ngày<input type="date" name="record_date" required defaultValue={new Date().toISOString().slice(0, 10)} /></label>
              <label>Loại<select name="type"><option value="bonus">Thưởng</option><option value="penalty">Phạt</option></select></label>
              <label>Số tiền<input type="number" name="amount" min="1" required /></label>
              <label>Lý do<input name="reason" /></label>
              <label>Ghi chú<textarea name="notes" /></label>
              <div className="lw-form__actions">
                <Button variant="secondary" onClick={() => setModal(null)}>Hủy</Button>
                <Button variant="primary" type="submit">Lưu</Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    );
  }

  window.LuaWeb = Object.assign(window.LuaWeb || {}, { BonusesScreen });
})();
